import Link from "next/link";
import type { CompanyFormProps } from "@/lib/types";

const inputStyles =
    "mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
const labelStyles = "text-sm font-semibold text-zinc-800";
const helperTextStyles = "mt-2 text-xs text-zinc-500";

export default function CompanyForm(props: CompanyFormProps) {
    return (
        <form
            action={props.action}
            className="rounded-3xl border border-zinc-200 bg-white/95 p-6 shadow-xl shadow-zinc-200/70 backdrop-blur sm:p-8"
        >
            <input type="hidden" name="id" value={props.initialData.id} />

            <div className="border-b border-zinc-200 pb-6">
                <h2 className="text-2xl font-semibold text-zinc-950">
                    Company details
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Keep the company profile accurate across every related application.
                </p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className={labelStyles}>
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Acme Corp"
                        defaultValue={props.initialData.name}
                        className={inputStyles}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="website" className={labelStyles}>
                        Website
                    </label>
                    <input
                        type="text"
                        id="website"
                        name="website"
                        placeholder="https://company.com"
                        defaultValue={props.initialData.website}
                        className={inputStyles}
                    />
                    <p className={helperTextStyles}>
                        Save the company homepage or careers page.
                    </p>
                </div>

                <div>
                    <label htmlFor="industry" className={labelStyles}>
                        Industry
                    </label>
                    <input
                        type="text"
                        id="industry"
                        name="industry"
                        placeholder="Commerce"
                        defaultValue={props.initialData.industry}
                        className={inputStyles}
                    />
                </div>

                <div>
                    <label htmlFor="location" className={labelStyles}>
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Toronto"
                        defaultValue={props.initialData.location}
                        className={inputStyles}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="notes" className={labelStyles}>
                        Notes
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        placeholder="Culture notes, recruiter context, compensation signals, or research links."
                        defaultValue={props.initialData.notes}
                        className={`${inputStyles} min-h-36 resize-y leading-6`}
                    />
                </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-end">
                <Link
                    href={`/companies/${props.initialData.id}`}
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                    {props.submitLabel}
                </button>
            </div>
        </form>
    );
}
