import type { ApplicationStatusLabel } from "@/lib/types";

type ApplicationStatusBadgeProps = {
    status: ApplicationStatusLabel;
};

export default function ApplicationStatusBadge({
                                                   status,
                                               }: ApplicationStatusBadgeProps) {
    const statusStyles: Record<ApplicationStatusLabel, string> = {
        Wishlist: "bg-zinc-100 text-zinc-700",
        Applied: "bg-blue-100 text-blue-700",
        Interview: "bg-amber-100 text-amber-700",
        Offer: "bg-green-100 text-green-700",
        Rejected: "bg-red-100 text-red-700",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
        >
      {status}
    </span>
    );
}
