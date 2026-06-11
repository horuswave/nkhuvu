import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { contactLeadId, otp } = await request.json();

    if (!contactLeadId || !otp) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const record = await prisma.contactOtp.findFirst({
      where: {
        contactLeadId,
        code: otp,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!record) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 },
      );
    }

    await prisma.$transaction([
      prisma.contactOtp.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
      prisma.contactLead.update({
        where: { id: contactLeadId },
        data: {
          isVerified: true,
          verifiedAt: new Date(),
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "OTP verification failed" },
      { status: 500 },
    );
  }
}
