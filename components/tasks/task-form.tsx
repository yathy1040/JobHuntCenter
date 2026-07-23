"use client";

import Link from "next/link";
import type { ChangeEvent } from "react";
import {TaskFormProps} from "@/lib/types";
import { useServerActionState } from "@/lib/use-server-action-state";
import SubmitButton from "@/components/ui/submit-button";
import RequiredMark from "@/components/ui/required-mark";

const inputStyles =
    "mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
const labelStyles = "text-sm font-semibold text-zinc-800";



export default function TasksForm(props: TaskFormProps) {
    const [state, formAction] = useServerActionState(props.action);

    return (
        <form action={formAction}
              className="rounded-3xl border border-zinc-200 bg-white/95 p-6 shadow-xl shadow-zinc-200/70 backdrop-blur sm:p-8">
            <div className="border-b border-zinc-200 pb-6">
                <h2 className="text-2xl font-semibold text-zinc-950">
                    Task Details
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Start with the task name, description and time.
                </p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    {props.mode === "edit" && props.initialData?.id ? (
                        <input type="hidden" name="id" value={props.initialData.id} />
                    ) : null}

                    <label htmlFor="applicationId" className={labelStyles}>
                        Application
                    </label>
                    <select
                        id="applicationId"
                        name="applicationId"
                        {...(props.selectedApplicationId !== undefined
                            ? {
                                value: props.selectedApplicationId,
                                onChange: (event: ChangeEvent<HTMLSelectElement>) =>
                                    props.onApplicationChange?.(event.target.value),
                            }
                            : {
                                defaultValue: props.initialData?.applicationId ?? "",
                            })}
                        className={inputStyles}
                    >
                        <option value="">No application</option>

                        {props.applications.map((application) => (
                            <option key={application.id} value={application.id}>
                                {application.companyName} - {application.role}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="title" className={labelStyles}>
                        Title
                        <RequiredMark />
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Apply"
                        defaultValue={props.initialData?.title ?? ""}
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
                        defaultValue={props.initialData?.description ?? ""}
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
                        defaultValue={props.initialData?.dueAt ?? ""}
                        className={inputStyles}
                    />
                </div>


            </div>

            {state.error ? (
                <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {state.error}
                </p>
            ) : null}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-end">
                <Link
                    href={props.mode === "create" ? "/dashboard" : `/applications/${props.initialData?.id}`}
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                >
                    Cancel
                </Link>
                <SubmitButton label={props.submitLabel} />
            </div>
        </form>
    )
}
