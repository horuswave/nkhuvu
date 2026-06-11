import { prisma } from "@/lib/prisma";
import CreateAdminAccountForm from "./CreateAdminAccountForm";
import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) notFound();

  const lead = await prisma.contactLead.findFirst({
    where: { adminInviteToken: token, isAdminRequest: true },
  });

  if (!lead) notFound();

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <CreateAdminAccountForm
        token={token}
        email={lead.email}
        name={lead.name || ""}
      />
    </main>
  );
}
