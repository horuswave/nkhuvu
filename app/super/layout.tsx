import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import SuperAdminSidebar, {
  SuperAdminTopBar,
} from "@/components/admin/SuperAdminSidebar";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export default async function SuperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  if (!session.user.isSuperAdmin) redirect("/admin/dashboard");

  return (
    <SidebarProvider>
      <SuperAdminSidebar
        userEmail={session.user.email ?? ""}
        userName={session.user.name ?? ""}
        signOutAction={signOutAction}
      />
      <SidebarInset className="bg-stone-50 min-w-0 flex flex-col">
        <SuperAdminTopBar />
        <div className="flex-1 pt-14 md:pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
