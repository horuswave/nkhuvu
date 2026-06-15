"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function processCheckout(data: {
  name: string;
  email: string;
  passwordRaw: string;
  packageName: string;
  mpesaTransactionId: string;
}) {
  const passwordHash = await bcrypt.hash(data.passwordRaw, 12);

  // 1. Find the Package
  const pkg = await prisma.package.findUnique({
    where: { name: data.packageName },
  });

  if (!pkg) {
    throw new Error(`Package ${data.packageName} not found`);
  }

  // 2. Create or Update AdminUser
  const admin = await prisma.adminUser.upsert({
    where: { email: data.email },
    update: { name: data.name, passwordHash },
    create: {
      email: data.email,
      name: data.name,
      passwordHash,
      isSuperAdmin: false,
    },
  });

  // 3. Create Subscription
  // We assume a 1-year subscription for now
  const startDate = new Date();
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1);

  const subscription = await prisma.subscription.upsert({
    where: { adminUserId: admin.id },
    update: {
      packageId: pkg.id,
      status: "ACTIVE",
      startDate,
      endDate,
      mpesaTransactionId: data.mpesaTransactionId,
    },
    create: {
      adminUserId: admin.id,
      packageId: pkg.id,
      status: "ACTIVE",
      startDate,
      endDate,
      mpesaTransactionId: data.mpesaTransactionId,
    },
  });

  return { success: true, admin: { id: admin.id, email: admin.email } };
}
