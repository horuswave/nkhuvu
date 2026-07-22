-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED', 'PENDING');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "anniversaryLabel" TEXT,
ADD COLUMN     "detailsContactText" TEXT,
ADD COLUMN     "detailsSectionTitle" TEXT,
ADD COLUMN     "giftListIntro" TEXT,
ADD COLUMN     "giftListMonetaryTitle" TEXT,
ADD COLUMN     "giftListPhysicalTitle" TEXT,
ADD COLUMN     "heroFooterText" TEXT,
ADD COLUMN     "heroSubtitle" TEXT,
ADD COLUMN     "programSubtitle" TEXT,
ADD COLUMN     "programTitle" TEXT,
ADD COLUMN     "rsvpAddCompanionLabel" TEXT,
ADD COLUMN     "rsvpAlreadyResponded" TEXT,
ADD COLUMN     "rsvpAttendingLabel" TEXT,
ADD COLUMN     "rsvpCompanionsLabel" TEXT,
ADD COLUMN     "rsvpDietaryLabel" TEXT,
ADD COLUMN     "rsvpMessageLabel" TEXT,
ADD COLUMN     "rsvpNotAttendingLabel" TEXT,
ADD COLUMN     "rsvpSubmitAttending" TEXT,
ADD COLUMN     "rsvpSubmitNotAttending" TEXT,
ADD COLUMN     "rsvpSubtitle" TEXT,
ADD COLUMN     "rsvpTitle" TEXT,
ADD COLUMN     "rsvpTransportLabel" TEXT,
ADD COLUMN     "rsvpUpdateButton" TEXT,
ADD COLUMN     "themeId" TEXT NOT NULL DEFAULT 'classic';

-- CreateTable
CREATE TABLE "LandingLead" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "deviceType" TEXT,
    "isMobile" BOOLEAN NOT NULL DEFAULT false,
    "mobileBrand" TEXT,
    "deviceModel" TEXT,
    "phoneSpec" TEXT,
    "browser" TEXT,
    "browserVersion" TEXT,
    "os" TEXT,
    "country" TEXT,
    "countryCode" TEXT,
    "city" TEXT,
    "region" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "sessionStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionEnd" TIMESTAMP(3),
    "sessionDuration" INTEGER,
    "referrer" TEXT,
    "landingPageUrl" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "viewedEventId" TEXT,
    "timeOnPage" INTEGER,
    "scrolledPercent" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandingLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactLead" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "message" TEXT,
    "locale" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "isAdminRequest" BOOLEAN NOT NULL DEFAULT true,
    "adminInviteToken" TEXT,
    "inviteSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactOtp" (
    "id" TEXT NOT NULL,
    "contactLeadId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactOtp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'MZN',
    "maxEvents" INTEGER NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "features" JSONB NOT NULL DEFAULT '[]',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "mpesaTransactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandingLead_sessionId_key" ON "LandingLead"("sessionId");

-- CreateIndex
CREATE INDEX "LandingLead_createdAt_idx" ON "LandingLead"("createdAt");

-- CreateIndex
CREATE INDEX "LandingLead_country_idx" ON "LandingLead"("country");

-- CreateIndex
CREATE INDEX "LandingLead_deviceType_idx" ON "LandingLead"("deviceType");

-- CreateIndex
CREATE INDEX "LandingLead_mobileBrand_idx" ON "LandingLead"("mobileBrand");

-- CreateIndex
CREATE UNIQUE INDEX "ContactLead_adminInviteToken_key" ON "ContactLead"("adminInviteToken");

-- CreateIndex
CREATE INDEX "ContactLead_email_idx" ON "ContactLead"("email");

-- CreateIndex
CREATE INDEX "ContactOtp_contactLeadId_idx" ON "ContactOtp"("contactLeadId");

-- CreateIndex
CREATE INDEX "ContactOtp_code_idx" ON "ContactOtp"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Package_name_key" ON "Package"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_adminUserId_key" ON "Subscription"("adminUserId");

-- CreateIndex
CREATE INDEX "Subscription_adminUserId_idx" ON "Subscription"("adminUserId");

-- CreateIndex
CREATE INDEX "Subscription_packageId_idx" ON "Subscription"("packageId");

-- AddForeignKey
ALTER TABLE "ContactOtp" ADD CONSTRAINT "ContactOtp_contactLeadId_fkey" FOREIGN KEY ("contactLeadId") REFERENCES "ContactLead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
