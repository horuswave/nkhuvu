import { auth, signOut } from "@/auth";
import { getMyEvent } from "@/actions/events";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const event = await getMyEvent();

  return (
    <SidebarProvider>
      <AdminSidebar
        event={event}
        userName={session.user?.name ?? ""}
        signOutAction={signOutAction}
      />
      <SidebarInset className="bg-stone-50 min-w-0">{children}</SidebarInset>
    </SidebarProvider>
  );
}
