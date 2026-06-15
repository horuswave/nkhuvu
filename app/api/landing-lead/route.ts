import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { geolocation } from "@vercel/functions";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;

    const geo = geolocation(request);
    const country =
      request.headers.get("x-vercel-ip-country") || geo.country || null;
    const countryCode =
      request.headers.get("x-vercel-ip-country") || geo.country || null;
    const city = request.headers.get("x-vercel-ip-city") || geo.city || null;
    const region =
      request.headers.get("x-vercel-ip-country-region") || geo.region || null;

    const {
      sessionId,
      userAgent,
      deviceType,
      isMobile,
      mobileBrand,
      deviceModel,
      phoneSpec,
      browser,
      browserVersion,
      os,
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
        timeOnPage:
          typeof timeOnPage === "number" ? Math.max(timeOnPage, 0) : undefined,
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

    return NextResponse.json({
      success: true,
      id: lead.id,
      geo: { country, countryCode, city, region, ipAddress },
    });
  } catch (error) {
    console.error("LandingLead error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const leads = await prisma.landingLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(leads);
}
