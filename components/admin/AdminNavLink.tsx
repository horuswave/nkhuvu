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
      className="relative px-3 py-3 text-xs uppercase tracking-widest transition-colors"
      style={{
        fontFamily: font,
        color: isActive ? color : "#a8a29e", // stone-400
      }}
    >
      {label}
      {isActive && (
        <span
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: color }}
        />
      )}
    </Link>
  );
}
