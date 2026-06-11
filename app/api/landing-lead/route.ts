import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      sessionId,
      ipAddress,
      userAgent,
      deviceType,
      isMobile,
      mobileBrand,
      deviceModel,
      phoneSpec,
      browser,
      browserVersion,
      os,
      country,
      countryCode,
      city,
      region,
      referrer,
      landingPageUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      timeOnPage,
      scrolledPercent,
    } = body;

    const lead = await prisma.landingLead.upsert({
      where: { sessionId: sessionId || `temp-${Date.now()}` },
      update: {
        sessionEnd: new Date(),
        timeOnPage: timeOnPage ? Math.max(timeOnPage, 0) : undefined,
        scrolledPercent,
        updatedAt: new Date(),
      },
      create: {
        sessionId: sessionId || `temp-${Date.now()}`,
        ipAddress,
        userAgent,
        deviceType,
        isMobile: isMobile ?? false,
        mobileBrand,
        deviceModel,
        phoneSpec,
        browser,
        browserVersion,
        os,
        country,
        countryCode,
        city,
        region,
        referrer,
        landingPageUrl: landingPageUrl || request.nextUrl.pathname,
        utmSource,
        utmMedium,
        utmCampaign,
        timeOnPage,
        scrolledPercent,
      },
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("LandingLead error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// Debug endpoint
export async function GET() {
  const leads = await prisma.landingLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json(leads);
}
