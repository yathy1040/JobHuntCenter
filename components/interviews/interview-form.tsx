import Link from "next/link";

import {InterviewFormProps} from "@/lib/types";

const inputStyles =
    "mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
const labelStyles = "text-sm font-semibold text-zinc-800";
const helperTextStyles = "mt-2 text-xs text-zinc-500";

export default function InterviewForm(props: InterviewFormProps) {
    return (
        <form action={props.action}
        className="rounded-3xl border border-zinc-200 bg-white/95 p-6 shadow-xl shadow-zinc-200/70 backdrop-blur sm:p-8">
        <div className="border-b border-zinc-200 pb-6">
            <h2 className="text-2xl font-semibold text-zinc-950">
                Interview Details
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
                Start with the company, role, and current pipeline status.
            </p>
        </div>

        <div>
            <input type="hidden" name="application_id" value={props.applicationId} />
            {props.mode === "edit" && props.initialData?.id ? (
                <input type="hidden" name="id" value={props.initialData.id} />
            ) : null}
            <label htmlFor="stage" className={labelStyles}>
                Stage
            </label>
            <select
                className={`${inputStyles} appearance-none bg-[linear-gradient(45deg,transparent_50%,#71717a_50%),linear-gradient(135deg,#71717a_50%,transparent_50%)] bg-[length:5px_5px,5px_5px] bg-[position:calc(100%-20px)_50%,calc(100%-15px)_50%] bg-no-repeat pr-10`}
                name="stage"
                id="stage"
                required
                defaultValue={props.initialData?.stage ?? ""}
            >
                <option value="RECRUITER_SCREEN">Recruiter Screen</option>
                <option value="HIRING_MANAGER">Hiring Manager</option>
                <option value="TECHNICAL">Technical</option>
                <option value="BEHAVIOURAL">Behavioural</option>
                <option value="SYSTEM_DESIGN">System Design</option>
                <option value="FINAL">Final</option>
                <option value="OTHER">Other</option>
            </select>
            <p className={helperTextStyles}>
                Pick the stage that best reflects where this opportunity sits.
            </p>
        </div>

        <div>
            <label htmlFor="scheduledAt" className={labelStyles}>
                Scheduled At
            </label>
            <input
                type="date"
                id="scheduledAt"
                name="scheduledAt"
                defaultValue={props.initialData?.scheduledAt ?? ""}
                className={inputStyles}
                required
            />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>

                <label htmlFor="durationMinutes" className={labelStyles}>
                    Duration in Minutes
                </label>
                <input
                    type="number"
                    id="durationMinutes"
                    name="durationMinutes"
                    placeholder="12"
                    defaultValue={props.initialData?.durationMinutes ?? ""}
                    className={inputStyles}
                />
            </div>

            <div>
                <label htmlFor="format" className={labelStyles}>
                    Format
                </label>
                <input
                    type="text"
                    id="format"
                    name="format"
                    className={inputStyles}
                    placeholder="Online"
                    defaultValue={props.initialData?.format ?? ""}
                />
            </div>


            <div className="sm:col-span-2">
                <label htmlFor="location" className={labelStyles}>
                    Location
                </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    className={inputStyles}
                    placeholder="Zoom"
                    defaultValue={props.initialData?.location ?? ""}
                />
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="url" className={labelStyles}>
                    Meeting URL
                </label>
                <input
                    type="url"
                    className={inputStyles}
                    name="url"
                    id="url"
                    placeholder="https://company.com/careers/frontend-engineer"
                    defaultValue={props.initialData?.url ?? ""}
                />
                <p className={helperTextStyles}>
                    Save the posting link for quick reference before interviews or
                    follow-ups.
                </p>
            </div>


            <div className="sm:col-span-2">
                <label htmlFor="notes" className={labelStyles}>
                    Notes
                </label>
                <textarea
                    className={`${inputStyles} min-h-36 resize-y leading-6`}
                    name="notes"
                    id="notes"
                    defaultValue={props.initialData?.notes ?? ""}
                    placeholder="Paste requirements, recruiter details, compensation notes, or interview prep reminders."
                />
            </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-end">
            <Link
                href="/applications"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
                Cancel
            </Link>
            <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
                {props.mode === "create" ? "Create Interview" : "Save Changes" }
            </button>
        </div>
    </form>)
}