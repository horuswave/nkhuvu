"use server";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Generate a 6-digit OTP code
function generateOtpCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

// Send OTP via email
export async function sendOtpToEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if contact lead exists, if not create it
    let contactLead = await prisma.contactLead.findFirst({
      where: { email },
    });

    if (!contactLead) {
      contactLead = await prisma.contactLead.create({
        data: {
          email,
          isAdminRequest: false,
        },
      });
    }

    // Generate OTP code
    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Store OTP in database
    await prisma.contactOtp.create({
      data: {
        contactLeadId: contactLead.id,
        code,
        expiresAt,
      },
    });

    // Send email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER || "noreply@weddingapp.mz",
      to: email,
      subject: "Your Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #c8890e;">Your Verification Code</h2>
          <p style="font-size: 16px; color: #333;">Use the following code to verify your email address:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #c8890e;">${code}</span>
          </div>
          <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
          <p style="font-size: 14px; color: #666;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return { success: false, error: error.message };
  }
}

// Verify OTP code
export async function verifyOtpCode(email: string, code: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Find contact lead
    const contactLead = await prisma.contactLead.findFirst({
      where: { email },
    });

    if (!contactLead) {
      return { success: false, error: "Email not found" };
    }

    // Find valid OTP
    const otp = await prisma.contactOtp.findFirst({
      where: {
        contactLeadId: contactLead.id,
        code,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otp) {
      return { success: false, error: "Invalid or expired code" };
    }

    // Mark OTP as used
    await prisma.contactOtp.update({
      where: { id: otp.id },
      data: { usedAt: new Date() },
    });

    // Mark contact lead as verified
    await prisma.contactLead.update({
      where: { id: contactLead.id },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return { success: false, error: error.message };
  }
}
