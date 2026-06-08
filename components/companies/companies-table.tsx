import Link from "next/link";
import type {Company} from "@/lib/types";

type CompaniesTableProps = {
    companies: Company[];
};

export default function CompaniesTable({
                                           companies,
                                       }: CompaniesTableProps) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-200 p-4">
                <h2 className="text-lg font-semibold text-zinc-900">
                    Companies
                </h2>
                <p className="text-sm text-zinc-500">
                    Track companies.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead className="bg-zinc-50 text-sm text-zinc-500">
                    <tr>
                        <th className="px-4 py-3 font-medium">Company</th>
                        <th className="px-4 py-3 font-medium">Industry</th>
                        <th className="px-4 py-3 font-medium">Location</th>
                        <th className="px-4 py-3 font-medium">Number of Applications</th>
                        <th className="px-4 py-3 font-medium">Link</th>
                    </tr>
                    </thead>

                    <tbody>
                    {companies.map((company) => (
                        <tr
                            key={company.id}
                            className="border-t border-zinc-200 text-sm text-zinc-700"
                        >
                            <td className="px-4 py-4 font-medium text-zinc-900">
                                {company.name}
                            </td>
                            <td className="px-4 py-4">{company.industry}</td>
                            <td className="px-4 py-4">
                                {company.location}
                            </td>
                            <td className="px-4 py-4">{company.count}</td>
                            <td className="px-4 py-4"><Link className="mt-4 rounded-lg
                            bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700" href={`/companies/${company.id}`} >View</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}