import {Metric} from "@/lib/types";

type StatusBreakdownProps = {
    metrics: Metric[];
};

export default function StatusBreakdown({ metrics }: StatusBreakdownProps) {
    return (
        <>
            {metrics.map((metric: Metric) => (
                <h1 key={metric.title}>{metric.title}: {metric.value}</h1>
                ))}
        </>
    )
}
