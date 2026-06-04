import { deleteApplication } from "@/lib/actions/applications";

type DeleteApplicationButtonProps = {
    id: string;
};

export default function DeleteApplicationButton({
                                                    id,
                                                }: DeleteApplicationButtonProps) {
    const deleteApplicationWithId = deleteApplication.bind(null, id);

    return (
        <form action={deleteApplicationWithId}>
            <button
                type="submit"
                className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
                Delete
            </button>
        </form>
    );
}