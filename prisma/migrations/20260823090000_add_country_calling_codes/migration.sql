CREATE TABLE "CountryCallingCode" (
  "iso2" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "callingCode" TEXT NOT NULL,
  "flag" TEXT NOT NULL,
  "enabled" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CountryCallingCode_pkey" PRIMARY KEY ("iso2")
);

CREATE INDEX "CountryCallingCode_enabled_name_idx"
  ON "CountryCallingCode"("enabled", "name");
