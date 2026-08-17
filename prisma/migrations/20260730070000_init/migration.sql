CREATE TYPE "SubmissionStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'RESOLVED', 'SPAM', 'ARCHIVED');
CREATE TYPE "ApplicationStatus" AS ENUM ('RECEIVED', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED');

CREATE TABLE "ContactSubmission" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "company" TEXT,
  "subject" TEXT,
  "message" TEXT NOT NULL,
  "sourceUrl" TEXT,
  "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "NewsletterSubscription" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "unsubscribedAt" TIMESTAMP(3),
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "NewsletterSubscription_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CareerApplication" (
  "id" TEXT NOT NULL,
  "jobReference" TEXT NOT NULL,
  "applicantName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "resumeKey" TEXT NOT NULL,
  "resumeFileName" TEXT NOT NULL,
  "coverLetter" TEXT,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'RECEIVED',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CareerApplication_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ContactSubmission_status_createdAt_idx" ON "ContactSubmission"("status", "createdAt");
CREATE INDEX "ContactSubmission_email_idx" ON "ContactSubmission"("email");
CREATE UNIQUE INDEX "NewsletterSubscription_email_key" ON "NewsletterSubscription"("email");
CREATE INDEX "CareerApplication_jobReference_createdAt_idx" ON "CareerApplication"("jobReference", "createdAt");
CREATE INDEX "CareerApplication_status_createdAt_idx" ON "CareerApplication"("status", "createdAt");
CREATE INDEX "CareerApplication_email_idx" ON "CareerApplication"("email");
