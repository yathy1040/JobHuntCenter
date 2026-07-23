import type { Application } from "@/lib/types";
import Link from "next/link";
import ApplicationStatusBadge from "./application-status-badge";

type ApplicationsTableProps = {
    applications: Application[];
};

export default function ApplicationsTable({
                                              applications,
                                          }: ApplicationsTableProps) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-200 p-4">
                <h2 className="text-lg font-semibold text-zinc-900">
                    Recent Applications
                </h2>
                <p className="text-sm text-zinc-500">
                    Track your latest roles and next steps.
                </p>
            </div>

            {applications.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-zinc-50 text-sm text-zinc-500">
                        <tr>
                            <th className="px-4 py-3 font-medium">Company</th>
                            <th className="px-4 py-3 font-medium">Role</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Date Applied</th>
                            <th className="px-4 py-3 font-medium">Next Action</th>
                            <th className="px-4 py-3 font-medium">Link</th>
                        </tr>
                        </thead>

                        <tbody>
                        {applications.map((application) => (
                            <tr
                                key={application.id}
                                className="border-t border-zinc-200 text-sm text-zinc-700"
                            >
                                <td className="px-4 py-4 font-medium text-zinc-900">
                                    {application.company}
                                </td>
                                <td className="px-4 py-4">{application.role}</td>
                                <td className="px-4 py-4">
                                    <ApplicationStatusBadge status={application.status} />
                                </td>
                                <td className="px-4 py-4">{application.dateApplied}</td>
                                <td className="px-4 py-4">{application.nextAction}</td>
                                <td className="px-4 py-4"><Link className="mt-4 rounded-lg
                                bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700" href={`/applications/${application.id}`} >View</Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex min-h-32 items-center justify-center px-4 py-8 text-center">
                    <div>
                        <p className="text-sm font-semibold text-zinc-700">No applications yet</p>
                        <p className="mt-1 text-sm text-zinc-500">
                            Applications will appear here once you add one.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}