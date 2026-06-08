import Link from "next/link";
import type {Company} from "@/lib/types";

type CompaniesTableProps = {
    companies: Company[];
};

export default function CompaniesTable({
                                           companies,
                                       }: CompaniesTableProps) {
    return (
        <div className="overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white shadow-xl shadow-slate-200/70">
            <div className="flex flex-col gap-3 border-b border-zinc-200 bg-white p-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                        Directory
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950">
                        Companies
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        Track company context, application count, and profile details.
                    </p>
                </div>
                <span className="w-fit rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white">
                    {companies.length} total
                </span>
            </div>

            {companies.length > 0 ? (
                <>
                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full text-left">
                            <thead className="bg-zinc-50 text-xs uppercase tracking-[0.16em] text-zinc-500">
                    <tr>
                        <th className="px-5 py-4 font-bold">Company</th>
                        <th className="px-5 py-4 font-bold">Industry</th>
                        <th className="px-5 py-4 font-bold">Location</th>
                        <th className="px-5 py-4 font-bold">Applications</th>
                        <th className="px-5 py-4 font-bold">Profile</th>
                    </tr>
                    </thead>

                    <tbody>
                    {companies.map((company) => (
                        <tr
                            key={company.id}
                            className="border-t border-zinc-100 text-sm text-zinc-700 transition hover:bg-teal-50/50"
                        >
                            <td className="px-5 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-teal-100 text-sm font-black uppercase text-teal-800">
                                        {company.name.slice(0, 1)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-950">{company.name}</p>
                                        <p className="text-xs text-zinc-500">
                                            {company.website ?? "No website recorded"}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5">
                                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                                    {company.industry ?? "Uncategorized"}
                                </span>
                            </td>
                            <td className="px-5 py-5">{company.location ?? "No location"}</td>
                            <td className="px-5 py-5">
                                <span className="inline-flex min-w-10 justify-center rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                                    {company.count ?? 0}
                                </span>
                            </td>
                            <td className="px-5 py-5">
                                <Link
                                    className="inline-flex rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-teal-700"
                                    href={`/companies/${company.id}`}
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                    </div>

                    <div className="grid gap-3 p-4 md:hidden">
                        {companies.map((company) => (
                            <Link
                                key={company.id}
                                className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-teal-200 hover:bg-teal-50/40"
                                href={`/companies/${company.id}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-lg font-black text-zinc-950">{company.name}</p>
                                        <p className="mt-1 text-sm text-zinc-500">
                                            {company.industry ?? "Uncategorized"}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                                        {company.count ?? 0}
                                    </span>
                                </div>
                                <div className="mt-4 grid gap-2 text-sm text-zinc-600">
                                    <p>{company.location ?? "No location recorded"}</p>
                                    <p>{company.website ?? "No website recorded"}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <div className="p-8 text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-teal-100 text-2xl font-black text-teal-800">
                        C
                    </div>
                    <h3 className="mt-4 text-lg font-black text-zinc-950">No companies yet</h3>
                    <p className="mt-2 text-sm text-zinc-500">
                        Companies will appear here after applications are connected to them.
                    </p>
                </div>
            )}
        </div>
    );
}
