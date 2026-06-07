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
      {/* Mobile top bar — sits outside the sidebar, inside SidebarInset's sibling */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-4 bg-white border-b border-stone-200">
        <SidebarTrigger className="text-stone-500" />
        <span
          className="text-base text-stone-800"
          style={{ fontFamily: fontDisplay, fontWeight: 400 }}
        >
          {event?.title ?? "Dashboard"}
        </span>
      </div>

      <Sidebar className="border-r border-stone-200 bg-white">
        <SidebarHeader className="px-5 py-6">
          <div>
            <p
              className="text-[10px] uppercase tracking-widest text-stone-400 mb-1"
              style={{ fontFamily: fontBody }}
            >
              {event?.coupleNames ?? "Wedding"}
            </p>
            <h1
              className="text-xl text-stone-800 leading-tight"
              style={{ fontFamily: fontDisplay, fontWeight: 400 }}
            >
              {event?.title ?? "Dashboard"}
            </h1>
          </div>
        </SidebarHeader>

        <SidebarSeparator className="bg-stone-100" />

        <SidebarContent className="px-3 py-4">
          <SidebarGroup>
            <SidebarGroupLabel
              className="text-[10px] uppercase tracking-widest text-stone-300 px-2 mb-1"
              style={{ fontFamily: fontBody }}
            >
              Manage
            </SidebarGroupLabel>
            <SidebarMenu>
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const isActive =
                  pathname === href || pathname.startsWith(href + "/");
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="rounded-sm transition-colors"
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
                        className="flex items-center gap-3 px-2 py-2"
                        style={{ fontFamily: fontBody }}
                      >
                        <Icon
                          size={15}
                          style={{ color: isActive ? primaryColor : undefined }}
                          className={isActive ? "" : "text-stone-400"}
                        />
                        <span
                          className={`text-sm ${isActive ? "font-medium" : "text-stone-600"}`}
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

        <SidebarFooter className="px-5 py-5 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs text-stone-500"
                style={{ fontFamily: fontBody }}
              >
                {userName}
              </p>
              <p
                className="text-[10px] text-stone-300 mt-0.5"
                style={{ fontFamily: fontBody }}
              >
                Administrator
              </p>
            </div>
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-red-500 transition-colors"
                style={{ fontFamily: fontBody }}
              >
                <LogOut size={12} />
                Sign out
              </button>
            </form>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
