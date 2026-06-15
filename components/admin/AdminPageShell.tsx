import { cn } from "@/lib/utils";

interface AdminPageShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function AdminPageShell({
  title,
  description,
  actions,
  children,
  className,
}: AdminPageShellProps) {
  return (
    <div className={cn("admin-page space-y-8", className)}>
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 truncate">
            {title}
          </h1>
          {description && (
            <p className="text-sm font-medium text-stone-500 mt-1.5 truncate">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </header>
      {children}
    </div>
  );
}

export function AdminSection({
  title,
  children,
  action,
  className,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
