"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/guests": "Guests",
  "/admin/tables": "Tables",
  "/admin/communications": "Communications",
  "/admin/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  for (const [path, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.includes(path)) return title;
  }
  if (pathname.includes("/admin/guests/new")) return "Add Guest";
  if (pathname.match(/\/admin\/guests\/[^/]+$/)) return "Edit Guest";
  return "Admin";
}

interface AdminTopBarProps {
  eventTitle?: string | null;
  coupleNames?: string | null;
}

export default function AdminTopBar({
  eventTitle,
  coupleNames,
}: AdminTopBarProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <>
      {/* Desktop top bar */}
      <header className="hidden md:flex sticky top-0 z-30 h-14 items-center gap-3 border-b border-stone-200/60 bg-white/80 backdrop-blur-xl px-6 shrink-0">
        <SidebarTrigger className="text-stone-500 hover:text-stone-800" />
        <div className="h-4 w-px bg-stone-200" />
        <div className="flex items-center gap-2 min-w-0 text-sm">
          <span className="font-semibold text-stone-800 truncate">
            {pageTitle}
          </span>
          {(coupleNames || eventTitle) && (
            <>
              <span className="text-stone-300">/</span>
              <span className="text-stone-500 truncate">
                {coupleNames ?? eventTitle}
              </span>
            </>
          )}
        </div>
      </header>
    </>
  );
}
