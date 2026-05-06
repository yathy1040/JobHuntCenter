import type { DashboardMetric } from "@/lib/types";

type MetricCardProps = {
    metric: DashboardMetric;
};

export default function MetricCard({ metric }: MetricCardProps) {

    return (
        <div>
            <h1>{metric.title}</h1>
            <h3>{metric.value}</h3>
            <h3>{metric.subtitle}</h3>
        </div>
    )

}