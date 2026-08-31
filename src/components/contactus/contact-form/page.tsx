"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Script from "next/script";
import { plusJakartaSans as exo2, plusJakartaSans as inter } from "@/lib/fonts";
import {
  FALLBACK_COUNTRY_CALLING_CODES,
  type CountryCallingCode,
} from "@/lib/country-calling-codes";
import type { ApiResponse } from "@/types/api";
import { PartnerLogoMarquee } from "../partner-logo-marquee";

const FALLBACK_GENERAL_CATEGORIES = [
  "Services",
  "Abhijat Marathi",
  "Solutions",
  "Products",
] as const;

const FALLBACK_PARTNER_CATEGORIES = [
  "Story",
  "Production",
  "Music",
  "Others",
] as const;

const FALLBACK_EMAIL = "Suman@gmail.com";
const FALLBACK_PHONE = "+91 5262-529-552";

export type ContactFormMode = "general" | "investor" | "partnership";

type ContactFormPageProps = {
  mode?: ContactFormMode;
  email?: string | null;
  phone?: string | null;
  generalCategories?: string[] | null;
  partnerCategories?: string[] | null;
};

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5 shrink-0"
    >
      <path
        d="M16.25 7.5L10 13.75L3.75 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 shrink-0"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function cleanCategories(
  categories: string[] | null | undefined,
  fallback: readonly string[],
) {
  const cleaned =
    categories?.map((category) => category.trim()).filter(Boolean) ?? [];
  return cleaned.length > 0 ? cleaned : [...fallback];
}

export default function ContactFormPage({
  mode = "general",
  email,
  phone,
  generalCategories,
  partnerCategories,
}: ContactFormPageProps) {
  const isPartnership = mode === "partnership";
  const categories = useMemo(
    () =>
      isPartnership
        ? cleanCategories(partnerCategories, FALLBACK_PARTNER_CATEGORIES)
        : cleanCategories(generalCategories, FALLBACK_GENERAL_CATEGORIES),
    [generalCategories, isPartnership, partnerCategories],
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[0] ?? "");
  const [countries, setCountries] = useState<CountryCallingCode[]>(
    FALLBACK_COUNTRY_CALLING_CODES,
  );
  const [selectedCountryIso, setSelectedCountryIso] = useState("IN");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);

  const publicEmail = email?.trim() || FALLBACK_EMAIL;
  const publicPhone = phone?.trim() || FALLBACK_PHONE;
  const selectedCountry =
    countries.find((country) => country.iso2 === selectedCountryIso) ??
    countries[0] ??
    FALLBACK_COUNTRY_CALLING_CODES[0];
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const controller = new AbortController();

    async function loadCountries() {
      try {
        const response = await fetch("/api/country-codes", {
          signal: controller.signal,
        });
        const result = (await response.json()) as ApiResponse<{
          items: CountryCallingCode[];
        }>;

        if (response.ok && result.success && result.data.items.length > 0) {
          setCountries(result.data.items);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.warn("Unable to load country calling codes", error);
        }
      }
    }

    void loadCountries();
    return () => controller.abort();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const mobileNumber = String(formData.get("mobileNumber") ?? "").trim();
    const category = String(formData.get("category") ?? selectedCategory).trim();
    const enquiryType =
      mode === "investor"
        ? "Investor enquiry"
        : isPartnership
          ? "Partnership enquiry"
          : "General enquiry";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          company: String(formData.get("company") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: mobileNumber
            ? `${selectedCountry.callingCode} ${mobileNumber}`
            : "",
          subject: category ? `${enquiryType}: ${category}` : enquiryType,
          message: String(formData.get("message") ?? ""),
          sourceUrl: window.location.href,
          turnstileToken: String(
            formData.get("cf-turnstile-response") ?? "",
          ),
          website: String(formData.get("website") ?? ""),
        }),
      });
      const result = (await response.json()) as ApiResponse<{ id: string }>;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your enquiry");
      }

      form.reset();
      setFeedback({
        kind: "success",
        message: "Thank you. Your enquiry has been submitted successfully.",
      });
    } catch (error) {
      setFeedback({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit your enquiry. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative mx-auto w-full max-w-full overflow-x-clip bg-white">
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}

      <section
        aria-labelledby="contact-form-page-heading"
        className="flex w-full flex-col items-center gap-[3.5rem] bg-white px-5 py-16 sm:px-8 lg:px-[3.5rem] lg:py-[6.25rem]"
      >
        <header className="flex w-full flex-col items-start gap-4">
          <h1
            id="contact-form-page-heading"
            className={`${exo2.className} w-full text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-[#1A1A1A] sm:text-[2.5rem] sm:leading-[3rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            Let&apos;s Start a Conversation.
          </h1>
          <p
            className={`${inter.className} w-full text-base font-normal leading-6 text-[rgba(0,9,51,0.65)]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            Whether you have a business opportunity, partnership idea, media
            enquiry or simply want to know more about Suman, we&apos;d love to hear
            from you.
          </p>
        </header>

        <div
          className="grid w-full grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(9.1875rem,1fr))]"
          aria-label={isPartnership ? "Partnership categories" : "Enquiry categories"}
        >
          {categories.map((category) => {
            const isSelected = category === selectedCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={isSelected}
                className={`${inter.className} inline-flex h-12 w-full min-w-0 items-center justify-center rounded-lg border-2 px-2 text-center text-sm font-semibold leading-5 text-[#8F6C1A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6C1A] sm:text-base sm:leading-6 ${
                  isSelected
                    ? "border-[#8F6C1A] bg-[#FFF9E8]"
                    : "border-[#D6D6D6] bg-white hover:border-[#8F6C1A]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid w-full grid-cols-1 items-start gap-[3.5rem] lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,1fr)]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full min-w-0 flex-col items-start gap-[3.5rem] rounded-[1.25rem] border border-[#E6E6E6] bg-white p-5 sm:p-8"
          >
            <h2
              className={`${inter.className} w-full text-xl font-normal leading-7 text-black`}
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              {isPartnership
                ? "Join the movement."
                : "Let’s Start a Conversation."}
            </h2>

            <div className="flex w-full flex-col items-start gap-5">
              <label className="flex w-full flex-col items-start gap-3">
                <span
                  className={`${inter.className} text-base font-normal leading-6 text-[rgba(0,6,38,0.90)]`}
                >
                  Your Name <span className="text-[rgba(0,9,51,0.65)]">*</span>
                </span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  placeholder="Aditya"
                  className={`${inter.className} h-12 w-full rounded-lg bg-[#F9F9F9] px-4 text-base leading-6 text-black outline-none placeholder:text-[#B8B8B8] focus:ring-2 focus:ring-[#8F6C1A]`}
                />
              </label>

              <label className="flex w-full flex-col items-start gap-3">
                <span className={`${inter.className} text-base font-normal leading-6 text-[rgba(0,6,38,0.90)]`}>
                  Company Name
                </span>
                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  maxLength={150}
                  placeholder="Suman Entertainment"
                  className={`${inter.className} h-12 w-full rounded-lg bg-[#F9F9F9] px-4 text-base leading-6 text-black outline-none placeholder:text-[#B8B8B8] focus:ring-2 focus:ring-[#8F6C1A]`}
                />
              </label>

              {isPartnership ? (
                <label className="flex w-full flex-col items-start gap-3">
                  <span className={`${inter.className} text-base font-normal leading-6 text-[rgba(0,6,38,0.90)]`}>
                    Categories
                  </span>
                  <span className="relative flex h-12 w-full items-center rounded-lg bg-[#F9F9F9]">
                    <select
                      name="category"
                      value={selectedCategory}
                      onChange={(event) => setSelectedCategory(event.target.value)}
                      required
                      className={`${inter.className} h-full w-full appearance-none rounded-lg bg-transparent px-4 pr-12 text-base leading-6 text-black outline-none focus:ring-2 focus:ring-[#8F6C1A]`}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 text-black">
                      <ChevronDownIcon />
                    </span>
                  </span>
                </label>
              ) : null}

              <label className="flex w-full flex-col items-start gap-3">
                <span className={`${inter.className} text-base font-normal leading-6 text-[rgba(0,6,38,0.90)]`}>
                  Email <span className="text-[rgba(0,9,51,0.65)]">*</span>
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="aditya@mycompanyname.com"
                  className={`${inter.className} h-12 w-full rounded-lg bg-[#F9F9F9] px-4 text-base leading-6 text-black outline-none placeholder:text-[#B8B8B8] focus:ring-2 focus:ring-[#8F6C1A]`}
                />
              </label>

              <label className="flex w-full flex-col items-start gap-3">
                <span className={`${inter.className} text-base font-normal leading-6 text-[rgba(0,6,38,0.90)]`}>
                  Mobile Number <span className="text-[rgba(0,9,51,0.65)]">*</span>
                </span>
                <span className="flex h-12 w-full items-center gap-2">
                  <span className="relative flex h-full w-[7.5rem] shrink-0 items-center justify-between rounded-lg bg-[#F9F9F9] px-4">
                    <span className={`${inter.className} truncate text-base leading-6 text-black`}>
                      {selectedCountry.flag} {selectedCountry.callingCode}
                    </span>
                    <ChevronDownIcon />
                    <select
                      aria-label="Country calling code"
                      value={selectedCountryIso}
                      onChange={(event) => setSelectedCountryIso(event.target.value)}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    >
                      {countries.map((country) => (
                        <option key={country.iso2} value={country.iso2}>
                          {country.flag} {country.callingCode} {country.name}
                        </option>
                      ))}
                    </select>
                  </span>
                  <input
                    name="mobileNumber"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    required
                    minLength={6}
                    maxLength={20}
                    placeholder="84209687XX"
                    className={`${inter.className} h-full min-w-0 flex-1 rounded-lg bg-[#F9F9F9] px-4 text-base leading-6 text-black outline-none placeholder:text-[#B8B8B8] focus:ring-2 focus:ring-[#8F6C1A]`}
                  />
                </span>
              </label>

              <label className="flex h-[10.5rem] w-full flex-col items-start gap-3">
                <span className={`${inter.className} text-base font-normal leading-6 text-[rgba(0,6,38,0.90)]`}>
                  Want to Mention Specific?
                </span>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  placeholder="Tell us about your query?"
                  className={`${inter.className} min-h-0 w-full flex-1 resize-none rounded-lg bg-[#F9F9F9] p-4 text-base leading-6 text-black outline-none placeholder:text-[#B8B8B8] focus:ring-2 focus:ring-[#8F6C1A]`}
                />
              </label>

              <label className="absolute -left-[10000px] h-px w-px overflow-hidden">
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>

              {turnstileSiteKey ? (
                <div
                  className="cf-turnstile"
                  data-sitekey={turnstileSiteKey}
                  data-action="contact"
                />
              ) : null}
            </div>

            <div className="flex w-full flex-col gap-3">
              <button
                type="submit"
                disabled={submitting}
                className={`${inter.className} group inline-flex h-12 w-full items-center justify-center gap-1 rounded-xl bg-[#8F6C1A] p-0 text-sm font-semibold leading-5 text-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.08),0_4px_8px_-2px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#765814] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6C1A] disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span>{submitting ? "Submitting…" : "Submit"}</span>
                <span className="transition-transform group-hover:translate-x-0.5">
                  <ChevronRightIcon />
                </span>
              </button>

              <p
                aria-live="polite"
                className={`${inter.className} min-h-5 text-sm leading-5 ${
                  feedback?.kind === "error"
                    ? "text-red-700"
                    : "text-emerald-700"
                }`}
              >
                {feedback?.message ?? ""}
              </p>
            </div>
          </form>

          <aside
            aria-label="Contact details"
            className={`${inter.className} flex min-w-0 flex-1 flex-col items-start gap-6 text-base font-normal leading-6 text-black`}
          >
            <p>
              <span>E-mail:&nbsp; </span>
              <a
                href={`mailto:${publicEmail}`}
                className="text-[#8F6C1A] transition-opacity hover:opacity-70"
              >
                {publicEmail}
              </a>
            </p>
            <p>
              <span>Contact Number:&nbsp; </span>
              <a
                href={`tel:${publicPhone.replace(/[^+\d]/g, "")}`}
                className="text-[#8F6C1A] transition-opacity hover:opacity-70"
              >
                {publicPhone}
              </a>
              <span className="text-[#8F6C1A]"> (Monday to Sunday 9am to 5pm)</span>
            </p>
          </aside>
        </div>
      </section>

      <section
        aria-label="Our partners"
        className="flex w-full flex-col items-center justify-center gap-6 bg-white px-5 py-4 sm:px-8 lg:px-[3.5rem]"
      >
        <PartnerLogoMarquee />
      </section>
    </main>
  );
}
