import type { DashboardMetric } from "@/lib/types";

type MetricCardProps = {
    metric: DashboardMetric;
};

export default function MetricCard({ metric }: MetricCardProps) {

    return (
        <div>
            <h1 className="text-2xl font-bold">{metric.title}</h1>
            <h3 className="text-lg">{metric.value}</h3>
            <h4>{metric.subtitle}</h4>
        </div>
    )

}