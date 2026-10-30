"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { LocalizedContent } from "@/components/localization/localized-content";
import { plusJakartaSans as exo2, plusJakartaSans as inter } from "@/lib/fonts";
import { CheckCircleIcon, CircleNotchIcon, UploadSimpleIcon, XIcon } from "@phosphor-icons/react";
import type { ApiResponse } from "@/types/api";

interface CareerApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobReference: string;
}

const MAX_RESUME_BYTES = 10 * 1024 * 1024; // 10MB

function resolveResumeContentType(file: File): string {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "application/pdf";
  if (ext === "doc") return "application/msword";
  if (ext === "docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  return file.type || "application/pdf";
}

export function CareerApplyModal({
  isOpen,
  onClose,
  jobTitle,
  jobReference,
}: CareerApplyModalProps) {
  const [applicantName, setApplicantName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [stepStatus, setStepStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, submitting, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    if (submitting) return;
    setApplicantName("");
    setEmail("");
    setPhone("");
    setCoverLetter("");
    setSelectedFile(null);
    setError(null);
    setSubmitted(false);
    setStepStatus("");
    onClose();
  };

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["pdf", "doc", "docx"].includes(ext)) {
      setError("Only PDF, DOC, or DOCX resumes are accepted.");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_RESUME_BYTES) {
      setError("Resume file size must be less than 10MB.");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    if (!applicantName.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please provide your email address.");
      return;
    }
    if (!selectedFile) {
      setError("Please attach your resume.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const turnstileToken =
      (formData.get("cf-turnstile-response") as string)?.trim() || undefined;

    try {
      // Step 1: Request S3 Presigned URL
      setStepStatus("Requesting upload ticket...");
      const contentType = resolveResumeContentType(selectedFile);

      const presignRes = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "resume",
          fileName: selectedFile.name,
          contentType,
          size: selectedFile.size,
          turnstileToken,
          website: "",
        }),
      });

      const presignResult = (await presignRes.json()) as ApiResponse<{
        uploadUrl: string;
        key: string;
        expiresIn: number;
      }>;

      if (!presignRes.ok || !presignResult.success || !presignResult.data) {
        throw new Error(presignResult.message || "Failed to initiate resume upload.");
      }

      const { uploadUrl, key } = presignResult.data;

      // Step 2: Upload binary file directly to S3 via presigned PUT URL
      setStepStatus("Uploading resume...");
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: selectedFile,
      });

      if (!uploadRes.ok) {
        throw new Error(
          `Unable to upload resume (${uploadRes.status} ${uploadRes.statusText}). Please check your connection and try again.`
        );
      }

      // Step 3: Record the application
      setStepStatus("Submitting your application...");
      const applyRes = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobReference: jobReference || jobTitle,
          applicantName: applicantName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          resumeKey: key,
          resumeFileName: selectedFile.name,
          coverLetter: coverLetter.trim() || undefined,
          turnstileToken,
          website: "",
        }),
      });

      const applyResult = (await applyRes.json()) as ApiResponse<{ id: string }>;
      if (!applyRes.ok || !applyResult.success) {
        throw new Error(applyResult.message || "Failed to submit application.");
      }

      setSubmitted(true);
      setStepStatus("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LocalizedContent>
      <div
        className="fixed inset-0 z-[2147483600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="career-apply-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        {turnstileSiteKey ? (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
        ) : null}

        <div
          ref={modalRef}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/10 bg-[#161616] p-6 shadow-2xl sm:p-8"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-40"
            aria-label="Close modal"
          >
            <XIcon size={20} weight="bold" />
          </button>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <CheckCircleIcon size={40} weight="fill" />
              </div>
              <h3
                className={`${exo2.className} text-2xl font-bold tracking-tight text-white`}
              >
                Application Submitted!
              </h3>
              <p className={`${inter.className} max-w-md text-sm text-white/70 leading-relaxed`}>
                Thank you for applying for{" "}
                <strong className="text-white font-medium">{jobTitle}</strong>.
                Our talent team has received your application and will review your profile.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-[#8F6C1A] hover:bg-white/90 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="inline-block rounded bg-[#8F6C1A]/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FFEABF]">
                  Career Application
                </span>
                <h2
                  id="career-apply-title"
                  className={`${exo2.className} mt-2 text-2xl font-semibold tracking-tight text-white`}
                >
                  Apply for {jobTitle}
                </h2>
                <p className={`${inter.className} text-xs text-white/50 mt-1`}>
                  Job Reference: {jobReference || jobTitle}
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-500/30 bg-red-950/40 p-3.5 text-sm text-red-200"
                >
                  {error}
                </div>
              )}

              {/* Honeypot field */}
              <div aria-hidden="true" className="sr-only">
                <label htmlFor="website-trap">Website</label>
                <input
                  id="website-trap"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="applicant-name"
                    className="block text-xs font-medium uppercase tracking-wider text-white/80"
                  >
                    Full Name <span className="text-[#8F6C1A]">*</span>
                  </label>
                  <input
                    id="applicant-name"
                    name="applicantName"
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Enter your full name"
                    disabled={submitting}
                    className="mt-1.5 block w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#8F6C1A] focus:outline-none focus:ring-1 focus:ring-[#8F6C1A] disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="applicant-email"
                      className="block text-xs font-medium uppercase tracking-wider text-white/80"
                    >
                      Email Address <span className="text-[#8F6C1A]">*</span>
                    </label>
                    <input
                      id="applicant-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      disabled={submitting}
                      className="mt-1.5 block w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#8F6C1A] focus:outline-none focus:ring-1 focus:ring-[#8F6C1A] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="applicant-phone"
                      className="block text-xs font-medium uppercase tracking-wider text-white/80"
                    >
                      Phone Number
                    </label>
                    <input
                      id="applicant-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      disabled={submitting}
                      className="mt-1.5 block w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#8F6C1A] focus:outline-none focus:ring-1 focus:ring-[#8F6C1A] disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label
                    htmlFor="applicant-resume"
                    className="block text-xs font-medium uppercase tracking-wider text-white/80"
                  >
                    Resume / CV (PDF, DOC, DOCX up to 10MB){" "}
                    <span className="text-[#8F6C1A]">*</span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-5 transition-colors ${
                      selectedFile
                        ? "border-[#8F6C1A] bg-[#8F6C1A]/10"
                        : "border-white/20 bg-white/5 hover:border-white/40"
                    }`}
                  >
                    <UploadSimpleIcon
                      size={28}
                      className={selectedFile ? "text-[#FFEABF]" : "text-white/40"}
                    />
                    <p className="mt-2 text-xs font-medium text-white/80">
                      {selectedFile ? (
                        <span className="text-[#FFEABF]">
                          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      ) : (
                        "Click to browse or drop your resume here"
                      )}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/40">
                      Supports PDF, DOC, and DOCX (Max 10MB)
                    </p>
                    <input
                      ref={fileInputRef}
                      id="applicant-resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      disabled={submitting}
                      className="sr-only"
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <label
                    htmlFor="applicant-cover"
                    className="block text-xs font-medium uppercase tracking-wider text-white/80"
                  >
                    Cover Note (Optional)
                  </label>
                  <textarea
                    id="applicant-cover"
                    name="coverLetter"
                    rows={3}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Briefly introduce yourself and why you'd be a great fit..."
                    disabled={submitting}
                    className="mt-1.5 block w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#8F6C1A] focus:outline-none focus:ring-1 focus:ring-[#8F6C1A] disabled:opacity-50"
                  />
                </div>

                {turnstileSiteKey ? (
                  <div className="flex justify-center pt-1">
                    <div
                      className="cf-turnstile"
                      data-sitekey={turnstileSiteKey}
                      data-theme="dark"
                    />
                  </div>
                ) : null}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-[#8F6C1A] transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <CircleNotchIcon size={18} className="animate-spin text-[#8F6C1A]" />
                      <span>{stepStatus || "Submitting..."}</span>
                    </>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </LocalizedContent>
  );
}
