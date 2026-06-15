"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavLink({
  href,
  label,
  font,
  color,
}: {
  href: string;
  label: string;
  font: string;
  color: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`relative px-4 py-3 text-xs uppercase tracking-widest transition-all duration-200 rounded-xl ${isActive ? 'font-bold' : 'font-medium hover:bg-stone-50'}`}
      style={{
        fontFamily: font,
        color: isActive ? color : "#78716c", // stone-500
        backgroundColor: isActive ? `${color}15` : undefined,
      }}
    >
      {label}
    </Link>
  );
}
