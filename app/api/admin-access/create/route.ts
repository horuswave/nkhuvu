import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token, email, name, password } = await req.json();

    if (!token || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const lead = await prisma.contactLead.findFirst({
      where: { adminInviteToken: token, email, isAdminRequest: true },
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await prisma.adminUser.create({
      data: {
        email,
        name: name || lead.name || "Admin",
        passwordHash,
        isSuperAdmin: false,
      },
    });

    await prisma.contactLead.update({
      where: { id: lead.id },
      data: {
        adminInviteToken: null,
      },
    });

    return NextResponse.json({ success: true, adminId: admin.id });
  } catch (error) {
    console.error("create admin error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
