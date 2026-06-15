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
  Users,
  UtensilsCrossed,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/guests", label: "Guests", icon: Users },
  { href: "/admin/tables", label: "Tables", icon: UtensilsCrossed },
  {
    href: "/admin/communications",
    label: "Communications",
    icon: MessageSquare,
  },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

type Event = {
  title?: string | null;
  coupleNames?: string | null;
  primaryColor?: string | null;
  fontDisplay?: string | null;
  fontBody?: string | null;
} | null;

interface AdminSidebarProps {
  event: Event;
  userName: string;
  signOutAction: () => Promise<void>;
}

export default function AdminSidebar({
  event,
  userName,
  signOutAction,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const primaryColor = event?.primaryColor ?? "#c8890e";
  const fontDisplay = event?.fontDisplay ?? "Georgia";
  const fontBody = event?.fontBody ?? "system-ui";

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-4 bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <SidebarTrigger className="text-stone-500" />
        <span
          className="text-base font-medium tracking-tight text-stone-800"
          style={{ fontFamily: fontDisplay }}
        >
          {event?.title ?? "Dashboard"}
        </span>
      </div>

      <Sidebar className="border-r border-stone-100 bg-[#fafaf9]">
        <SidebarHeader className="px-6 py-8">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2"
              style={{ fontFamily: fontBody }}
            >
              {event?.coupleNames ?? "Wedding"}
            </p>
            <h1
              className="text-2xl text-stone-900 leading-tight tracking-tight font-semibold"
              style={{ fontFamily: fontDisplay }}
            >
              {event?.title ?? "Dashboard"}
            </h1>
          </div>
        </SidebarHeader>

        <SidebarSeparator className="bg-stone-200/50 mx-4" />

        <SidebarContent className="px-4 py-6">
          <SidebarGroup>
            <SidebarGroupLabel
              className="text-[10px] font-bold uppercase tracking-widest text-stone-400 px-3 mb-3"
              style={{ fontFamily: fontBody }}
            >
              Manage
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const isActive =
                  pathname === href || pathname.startsWith(href + "/");
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="rounded-xl transition-all duration-200 h-10 px-3 hover:bg-stone-100"
                      style={
                        isActive
                          ? {
                              backgroundColor: `${primaryColor}15`,
                              color: primaryColor,
                            }
                          : undefined
                      }
                    >
                      <Link
                        href={href}
                        className="flex items-center gap-3"
                        style={{ fontFamily: fontBody }}
                      >
                        <Icon
                          size={18}
                          style={{ color: isActive ? primaryColor : undefined }}
                          className={isActive ? "" : "text-stone-500"}
                        />
                        <span
                          className={`text-sm tracking-wide ${isActive ? "font-bold" : "text-stone-600 font-medium"}`}
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
        </SidebarContent>

        <SidebarFooter className="px-6 py-6 border-t border-stone-200/50 mt-auto">
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold text-xs uppercase border border-stone-200">
                {userName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <p
                  className="text-xs font-bold text-stone-800 tracking-tight"
                  style={{ fontFamily: fontBody }}
                >
                  {userName.split(" ")[0]}
                </p>
                <p
                  className="text-[10px] font-medium text-stone-400"
                  style={{ fontFamily: fontBody }}
                >
                  Admin
                </p>
              </div>
            </div>
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex items-center justify-center p-2 rounded-xl text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
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
