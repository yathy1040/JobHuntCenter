import type { DashboardMetric } from "@/lib/types";

type MetricCardProps = {
    metric: DashboardMetric;
};

export default function MetricCard({ metric }: MetricCardProps) {

    return (
        <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {metric.title}
            </h3>
            <p className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                {metric.value}
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {metric.subtitle}
            </p>
        </article>
    )

}
