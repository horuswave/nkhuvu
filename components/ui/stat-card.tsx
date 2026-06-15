import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: string; positive?: boolean };
  accent?: "default" | "amber" | "emerald" | "rose" | "blue";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const accentStyles = {
  default: { icon: "bg-stone-100 text-stone-600", value: "text-stone-900" },
  amber: { icon: "bg-amber-50 text-amber-600", value: "text-amber-700" },
  emerald: { icon: "bg-emerald-50 text-emerald-600", value: "text-emerald-700" },
  rose: { icon: "bg-rose-50 text-rose-600", value: "text-rose-700" },
  blue: { icon: "bg-blue-50 text-blue-600", value: "text-blue-700" },
};

export function StatCard({
  label,
  value,
  icon,
  trend,
  accent = "default",
  className,
  size = "md",
}: StatCardProps) {
  const styles = accentStyles[accent];
  const valueSize =
    size === "lg" ? "text-4xl" : size === "sm" ? "text-2xl" : "text-3xl";

  return (
    <div
      className={cn(
        "card-elevated flex flex-col justify-between p-5 transition-all hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        {icon && (
          <div className={cn("p-2.5 rounded-xl shrink-0", styles.icon)}>
            {icon}
          </div>
        )}
        {trend && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              trend.positive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-stone-100 text-stone-500",
            )}
          >
            {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className={cn("font-bold tracking-tight", valueSize, styles.value)}>
          {value}
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mt-1.5">
          {label}
        </p>
      </div>
    </div>
  );
}
