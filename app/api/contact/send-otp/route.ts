import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mailer";
import crypto from "crypto";

function getOtp() {
  return String(crypto.randomInt(100000, 1000000));
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const otp = getOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const lead = await prisma.contactLead.create({
      data: {
        name,
        email,
        message,
        isVerified: false,
      },
    });

    await prisma.contactOtp.create({
      data: {
        contactLeadId: lead.id,
        code: otp,
        expiresAt,
      },
    });

    const subject = "Your OTP code";

    const html = `<p>Your verification code is <strong>${otp}</strong>. It expires in 10 minutes.</p>`;

    await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true, contactLeadId: lead.id });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
