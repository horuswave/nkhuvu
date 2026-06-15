import { auth, signOut } from "@/auth";
import { getMyEvent } from "@/actions/events";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) redirect(`/${locale}/admin/login`);

  if (!session.user.eventId && !session.user.isSuperAdmin) {
    redirect(`/${locale}/admin/onboarding`);
  }

  const event = await getMyEvent();

  return (
    <SidebarProvider>
      <AdminSidebar
        event={event}
        userName={session.user?.name ?? ""}
        signOutAction={signOutAction}
      />
      <SidebarInset className="bg-stone-50 min-w-0 flex flex-col">
        <AdminTopBar
          eventTitle={event?.title}
          coupleNames={event?.coupleNames}
        />
        <div className="flex-1 pt-14 md:pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
