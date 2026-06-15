"use server";

import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/guards";

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getVisitorStats() {
  await requireSuperAdmin();

  const today = daysAgo(0);
  const weekAgo = daysAgo(7);
  const monthAgo = daysAgo(30);

  const [
    totalVisitors,
    todayVisitors,
    weekVisitors,
    monthVisitors,
    mobileCount,
    desktopCount,
    avgTime,
    avgScroll,
    countryGroups,
    browserGroups,
    deviceGroups,
    utmGroups,
  ] = await Promise.all([
    prisma.landingLead.count(),
    prisma.landingLead.count({ where: { createdAt: { gte: today } } }),
    prisma.landingLead.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.landingLead.count({ where: { createdAt: { gte: monthAgo } } }),
    prisma.landingLead.count({ where: { isMobile: true } }),
    prisma.landingLead.count({ where: { isMobile: false } }),
    prisma.landingLead.aggregate({
      _avg: { timeOnPage: true },
      where: { timeOnPage: { gt: 0 } },
    }),
    prisma.landingLead.aggregate({
      _avg: { scrolledPercent: true },
      where: { scrolledPercent: { gt: 0 } },
    }),
    prisma.landingLead.groupBy({
      by: ["country"],
      _count: true,
      where: { country: { not: null } },
      orderBy: { _count: { country: "desc" } },
      take: 8,
    }),
    prisma.landingLead.groupBy({
      by: ["browser"],
      _count: true,
      where: { browser: { not: null } },
      orderBy: { _count: { browser: "desc" } },
      take: 6,
    }),
    prisma.landingLead.groupBy({
      by: ["deviceType"],
      _count: true,
      where: { deviceType: { not: null } },
    }),
    prisma.landingLead.groupBy({
      by: ["utmSource"],
      _count: true,
      where: { utmSource: { not: null } },
      orderBy: { _count: { utmSource: "desc" } },
      take: 5,
    }),
  ]);

  return {
    totalVisitors,
    todayVisitors,
    weekVisitors,
    monthVisitors,
    mobilePercent:
      totalVisitors > 0
        ? Math.round((mobileCount / totalVisitors) * 100)
        : 0,
    desktopPercent:
      totalVisitors > 0
        ? Math.round((desktopCount / totalVisitors) * 100)
        : 0,
    avgTimeOnPage: Math.round(avgTime._avg.timeOnPage ?? 0),
    avgScrollDepth: Math.round(avgScroll._avg.scrolledPercent ?? 0),
    topCountries: countryGroups.map((g) => ({
      name: g.country ?? "Unknown",
      count: g._count,
    })),
    topBrowsers: browserGroups.map((g) => ({
      name: g.browser ?? "Unknown",
      count: g._count,
    })),
    devices: deviceGroups.map((g) => ({
      name: g.deviceType ?? "unknown",
      count: g._count,
    })),
    utmSources: utmGroups.map((g) => ({
      name: g.utmSource ?? "direct",
      count: g._count,
    })),
  };
}

export async function getRecentVisitors(limit = 50) {
  await requireSuperAdmin();

  return prisma.landingLead.findMany({
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      sessionId: true,
      deviceType: true,
      isMobile: true,
      browser: true,
      os: true,
      country: true,
      city: true,
      referrer: true,
      utmSource: true,
      utmMedium: true,
      utmCampaign: true,
      timeOnPage: true,
      scrolledPercent: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getContactLeads(limit = 100) {
  await requireSuperAdmin();

  const [leads, total, verified] = await Promise.all([
    prisma.contactLead.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    }),
    prisma.contactLead.count(),
    prisma.contactLead.count({ where: { isVerified: true } }),
  ]);

  return { leads, total, verified, pending: total - verified };
}

export async function getDailyVisitorCounts(days = 14) {
  await requireSuperAdmin();

  const since = daysAgo(days);
  const visitors = await prisma.landingLead.findMany({
    where: { createdAt: { gte: since } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const counts: Record<string, number> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    counts[d.toISOString().slice(0, 10)] = 0;
  }

  for (const v of visitors) {
    const key = v.createdAt.toISOString().slice(0, 10);
    if (key in counts) counts[key]++;
  }

  return Object.entries(counts).map(([date, count]) => ({ date, count }));
}
