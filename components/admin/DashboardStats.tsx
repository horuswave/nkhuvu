import { Users, CheckCircle, XCircle, Clock, Heart } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

interface Stats {
  total: number;
  attending: number;
  declined: number;
  pending: number;
  totalHeadcount: number;
}

export default function DashboardStats({ stats }: { stats: Stats }) {
  const cards = [
    {
      label: "Total Households",
      value: stats.total,
      icon: <Users className="w-5 h-5" />,
      accent: "default" as const,
    },
    {
      label: "Total Headcount",
      value: stats.totalHeadcount,
      icon: <Heart className="w-5 h-5" />,
      accent: "amber" as const,
    },
    {
      label: "Attending",
      value: stats.attending,
      icon: <CheckCircle className="w-5 h-5" />,
      accent: "emerald" as const,
    },
    {
      label: "Awaiting Reply",
      value: stats.pending,
      icon: <Clock className="w-5 h-5" />,
      accent: "blue" as const,
    },
    {
      label: "Declined",
      value: stats.declined,
      icon: <XCircle className="w-5 h-5" />,
      accent: "rose" as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
      {cards.map((c) => (
        <StatCard
          key={c.label}
          label={c.label}
          value={c.value}
          icon={c.icon}
          accent={c.accent}
        />
      ))}
    </div>
  );
}
