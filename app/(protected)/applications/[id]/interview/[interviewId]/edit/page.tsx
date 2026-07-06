import { redirect } from "next/navigation";

export default async function EditInterviewRedirect({
    params,
}: {
    params: Promise<{ interviewId: string }>;
}) {
    const { interviewId } = await params;

    redirect(`/interviews/${interviewId}/edit`);
}
