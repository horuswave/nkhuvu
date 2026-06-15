"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CalendarDays,
  Eye,
  Mail,
  LogOut,
  Plus,
  CreditCard,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/super/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/super/visitors", label: "Visitors", icon: Eye },
  { href: "/super/leads", label: "Contact Leads", icon: Mail },
  { href: "/super/subscriptions", label: "Subscriptions", icon: CreditCard },
];

interface SuperAdminSidebarProps {
  userEmail: string;
  userName: string;
  signOutAction: () => Promise<void>;
}

export default function SuperAdminSidebar({
  userEmail,
  userName,
  signOutAction,
}: SuperAdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-4 py-3.5 bg-white/90 backdrop-blur-xl border-b border-stone-200/60 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <SidebarTrigger className="text-stone-500 shrink-0" />
          <span className="text-sm font-semibold text-stone-800 truncate">
            Super Admin
          </span>
        </div>
        <Link
          href="/super/events/new"
          className="btn-primary !px-3 !py-2 !text-xs shrink-0"
        >
          <Plus size={14} />
          New
        </Link>
      </div>

      <Sidebar className="border-r border-stone-200/60 bg-[#fafaf9]">
        <SidebarHeader className="px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center text-white text-sm font-bold">
              N
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                Platform
              </p>
              <h1 className="text-lg font-semibold text-stone-900 tracking-tight">
                Super Admin
              </h1>
            </div>
          </div>
        </SidebarHeader>

        <SidebarSeparator className="bg-stone-200/50 mx-4" />

        <SidebarContent className="px-3 py-5">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-stone-400 px-3 mb-2">
              Analytics
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-0.5">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const isActive =
                  pathname === href || pathname.startsWith(href + "/");
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="rounded-xl h-10 px-3 hover:bg-stone-100 data-[active=true]:bg-amber-50 data-[active=true]:text-amber-800"
                    >
                      <Link href={href} className="flex items-center gap-3">
                        <Icon
                          size={18}
                          className={
                            isActive ? "text-amber-700" : "text-stone-500"
                          }
                        />
                        <span
                          className={`text-sm ${isActive ? "font-bold" : "font-medium text-stone-600"}`}
                        >
                          {label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-stone-400 px-3 mb-2">
              Events
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="rounded-xl h-10 px-3 hover:bg-stone-100"
                >
                  <Link
                    href="/super/events/new"
                    className="flex items-center gap-3 text-stone-600"
                  >
                    <CalendarDays size={18} className="text-stone-500" />
                    <span className="text-sm font-medium">Create Event</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="px-4 py-5 border-t border-stone-200/50">
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-stone-100">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white font-bold text-xs uppercase shrink-0">
                {userName.charAt(0) || "S"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-stone-800 truncate">
                  {userName || "Super Admin"}
                </p>
                <p className="text-[10px] font-medium text-stone-400 truncate">
                  {userEmail}
                </p>
              </div>
            </div>
            <form action={signOutAction}>
              <button
                type="submit"
                className="p-2 rounded-xl text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </form>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

export function SuperAdminTopBar() {
  const pathname = usePathname();
  const titles: Record<string, string> = {
    "/super/dashboard": "Overview",
    "/super/visitors": "Visitor Analytics",
    "/super/leads": "Contact Leads",
    "/super/subscriptions": "Subscriptions",
    "/super/events/new": "Create Event",
  };

  let title = "Super Admin";
  for (const [path, label] of Object.entries(titles)) {
    if (pathname.includes(path)) {
      title = label;
      break;
    }
  }
  if (pathname.match(/\/super\/events\/[^/]+$/)) title = "Manage Event";

  return (
    <header className="hidden md:flex sticky top-0 z-30 h-14 items-center gap-3 border-b border-stone-200/60 bg-white/80 backdrop-blur-xl px-6 shrink-0">
      <SidebarTrigger className="text-stone-500 hover:text-stone-800" />
      <div className="h-4 w-px bg-stone-200" />
      <span className="text-sm font-semibold text-stone-800">{title}</span>
    </header>
  );
}
