"use client";

import { deleteCompany } from "@/lib/actions/companies";

type DeleteCompanyButtonProps = {
    id: string;
    name: string;
    applicationCount: number;
};

export default function DeleteCompanyButton({
    id,
    name,
    applicationCount,
}: DeleteCompanyButtonProps) {
    const deleteCompanyWithId = deleteCompany.bind(null, id);
    const impact =
        applicationCount > 0
            ? ` This will also delete its ${applicationCount} application${applicationCount === 1 ? "" : "s"} and any of their interviews.`
            : "";

    return (
        <form
            action={deleteCompanyWithId}
            onSubmit={(event) => {
                if (
                    !window.confirm(
                        `Delete "${name}"?${impact} This cannot be undone.`,
                    )
                ) {
                    event.preventDefault();
                }
            }}
        >
            <button
                type="submit"
                className="inline-flex items-center rounded-full border border-red-200 bg-white/80 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-50"
            >
                Delete company
            </button>
        </form>
    );
}
