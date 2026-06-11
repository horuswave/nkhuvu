import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { name, email, message, locale } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const token = crypto.randomUUID();
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/admin/create-account?token=${token}`;

    const lead = await prisma.contactLead.create({
      data: {
        name: name || null,
        email,
        message: message || null,
        locale: locale || null,
        isVerified: true,
        verifiedAt: new Date(),
        isAdminRequest: true,
        adminInviteToken: token,
        inviteSentAt: new Date(),
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Create your admin account",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>Admin account request received</h2>
          <p>Hi ${lead.name || "there"},</p>
          <p>Your request was approved. Click the button below to create your admin account:</p>
          <p>
            <a href="${inviteLink}"
               style="display:inline-block;padding:12px 18px;background:#111;color:#fff;text-decoration:none;border-radius:8px">
              Create admin account
            </a>
          </p>
          <p>If the button doesn’t work, copy this link:</p>
          <p>${inviteLink}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("admin request error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}