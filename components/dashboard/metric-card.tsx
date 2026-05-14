import type { DashboardMetric } from "@/lib/types";

type MetricCardProps = {
  metric: DashboardMetric;
};

export default function MetricCard({ metric }: MetricCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{metric.title}</h3>
      <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-white">{metric.value}</p>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{metric.subtitle}</p>
    </article>
  );
}
