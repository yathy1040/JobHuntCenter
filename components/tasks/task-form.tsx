import Link from "next/link";
import {ApplicationFormProps} from "@/lib/types";

const inputStyles =
    "mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
const labelStyles = "text-sm font-semibold text-zinc-800";
const helperTextStyles = "mt-2 text-xs text-zinc-500";



export default function TasksForm(props: ApplicationFormProps) {

    return (
        <form action={props.action}
              className="rounded-3xl border border-zinc-200 bg-white/95 p-6 shadow-xl shadow-zinc-200/70 backdrop-blur sm:p-8">
            <div className="border-b border-zinc-200 pb-6">
                <h2 className="text-2xl font-semibold text-zinc-950">
                    Role details
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Start with the company, role, and current pipeline status.
                </p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                    {props.mode === "edit" && props.initialData?.id ? (
                        <input type="hidden" name="id" value={props.initialData.id} />
                    ) : null}
                    <label htmlFor="title" className={labelStyles}>
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Apply"
                        defaultValue={props.initialData?.company ?? ""}
                        className={inputStyles}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className={labelStyles}>
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className={inputStyles}
                        defaultValue={props.initialData?.role ?? ""}
                        placeholder="Add description"
                    />
                </div>

                <div>
                    <label htmlFor="dueAt" className={labelStyles}>
                        Due At
                    </label>
                    <input
                        type="date"
                        id="dueAt"
                        name="dueAt"
                        defaultValue={props.initialData?.dateApplied ?? ""}
                        className={inputStyles}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="completed" className={labelStyles}>
                        Job URL
                    </label>
                    <input
                        type="text"
                        className={inputStyles}
                        name="completed"
                        id="completed"
                        defaultValue={props.initialData?.jobUrl ?? ""}
                        placeholder="Completed"
                    />
                    <p className={helperTextStyles}>
                        Save the posting link for quick reference before interviews or
                        follow-ups.
                    </p>
                </div>

            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-end">
                <Link
                    href={props.mode === "create" ? "/dashboard" : `/applications/${props.initialData?.id}`}
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
    )
}