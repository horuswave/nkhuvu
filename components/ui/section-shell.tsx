import { cn } from "@/lib/utils";

type SectionVariant = "canvas" | "white" | "muted" | "dark";

const variantClasses: Record<SectionVariant, string> = {
  canvas: "bg-surface-canvas",
  white: "bg-white",
  muted: "bg-stone-100/60",
  dark: "bg-stone-950 text-white",
};

interface SectionShellProps {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  /** narrow | default | wide */
  width?: "narrow" | "default" | "wide";
}

const widthClasses = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
};

export function SectionShell({
  id,
  variant = "canvas",
  className,
  containerClassName,
  children,
  width = "default",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-padding relative overflow-hidden",
        variantClasses[variant],
        className,
      )}
    >
      <div
        className={cn(
          "section-container relative z-10",
          widthClasses[width],
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className,
      )}
    >
      {badge && <div className={cn("mb-5", align === "center" && "flex justify-center")}>{badge}</div>}
      <h2 className="text-display-md text-stone-900 tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-stone-500 font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function SectionBadge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "dark";
}) {
  const styles = {
    default:
      "bg-white/70 backdrop-blur border-stone-200/60 text-stone-600",
    accent:
      "bg-amber-50 border-amber-200/60 text-amber-800",
    dark: "bg-white/10 border-white/20 text-stone-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border shadow-sm",
        styles[variant],
      )}
    >
      {children}
    </span>
  );
}
