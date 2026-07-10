import type {Metric} from "@/lib/types";

type AnalyticsMetricSectionProps = {
    title: string;
    description: string;
    metrics: Metric[];
    valueSuffix?: string;
    valueDecimalPlaces?: number;
    gridClassName?: string;
};

function formatMetricValue(value: number, decimalPlaces: number) {
    return Number.isInteger(value) ? value.toString() : value.toFixed(decimalPlaces);
}

export default function AnalyticsMetricSection({
    title,
    description,
    metrics,
    valueSuffix = "",
    valueDecimalPlaces = 0,
    gridClassName = "sm:grid-cols-2",
}: AnalyticsMetricSectionProps) {
    return (
        <section className="rounded-lg border border-zinc-200 bg-zinc-50/70 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    {title}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {description}
                </p>
            </div>
            <div className={`grid gap-3 ${gridClassName}`}>
                {metrics.map((metric) => (
                    <article
                        key={metric.title}
                        className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                    >
                        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                            {metric.title}
                        </h3>
                        <p className="mt-3 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
                            {formatMetricValue(metric.value, valueDecimalPlaces)}
                            {valueSuffix}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    )
}
