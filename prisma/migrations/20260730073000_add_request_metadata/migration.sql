ALTER TABLE "ContactSubmission"
  ADD COLUMN "requestId" TEXT NOT NULL DEFAULT 'legacy',
  ADD COLUMN "ipHash" TEXT,
  ADD COLUMN "userAgent" TEXT;

ALTER TABLE "CareerApplication"
  ADD COLUMN "requestId" TEXT NOT NULL DEFAULT 'legacy',
  ADD COLUMN "ipHash" TEXT,
  ADD COLUMN "userAgent" TEXT;

ALTER TABLE "ContactSubmission" ALTER COLUMN "requestId" DROP DEFAULT;
ALTER TABLE "CareerApplication" ALTER COLUMN "requestId" DROP DEFAULT;

CREATE INDEX "ContactSubmission_requestId_idx" ON "ContactSubmission"("requestId");
CREATE INDEX "CareerApplication_requestId_idx" ON "CareerApplication"("requestId");
