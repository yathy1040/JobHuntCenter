"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUserId } from "@/lib/current-user";
import {parseInterviewStage, parseOptionalHttpUrl} from "@/lib/actions/parsers";
import {parseInterviewData, parseScheduledAt} from "@/lib/actions/interview-data";



export async function createInterview(formData: FormData){
    const userId = await requireUserId();
    const data = parseInterviewData(formData);


    const application = await prisma.application.findFirst({
        where: {
            id: data.applicationId,
            userId,
        },
        select: {
            id: true,
        },
    });

    if (!application) {
        throw new Error("Application not found");
    }

    await prisma.interview.create({
        data: {
            userId,
            applicationId: data.applicationId,
            stage: data.stage,
            scheduledAt: data.scheduledAt,
            durationMinutes: data.durationMinutes || null,
            format: data.format || null,
            location: data.location || null,
            meetingUrl: data.url || null,
            notes: data.notes || null

        }
    })



    revalidatePath("/dashboard")
    revalidatePath("/applications")
    revalidatePath(`/applications/${data.applicationId}`)
    revalidatePath("/interviews")
    redirect(`/applications/${data.applicationId}`)

}

export async function updateInterview(formData: FormData){
    const userId = await requireUserId();
    const id = formData.get("id") as string;
    const applicationId = formData.get("application_id") as string;
    const stage = parseInterviewStage(formData.get("stage") as string);
    const scheduledAt = parseScheduledAt(formData.get("scheduledAt"));
    const durationMinutesValue = formData.get("durationMinutes");
    const durationMinutes =
        typeof durationMinutesValue === "string" && durationMinutesValue !== ""
            ? Number(durationMinutesValue)
            : null;
    const format = formData.get("format") as string;
    const location = formData.get("location") as string;
    const url = parseOptionalHttpUrl(formData.get("url"), "Meeting URL:");
    const notes = formData.get("notes") as string;

    if (!id || !applicationId) {
        throw new Error(`Interview and application id required`);
    }
    if (stage == null || scheduledAt == null) {
        throw new Error(`Stage and schedule time required`);
    }
    if (durationMinutes !== null && !Number.isFinite(durationMinutes)) {
        throw new Error(`Duration must be a valid number`);
    }

    const result = await prisma.interview.updateMany({
        where: { id, userId, applicationId },
        data: {
            stage,
            scheduledAt,
            durationMinutes: durationMinutes || null,
            format: format || null,
            location: location || null,
            meetingUrl: url || null,
            notes: notes || null

        }
    })

    if (result.count === 0) {
        throw new Error("Interview not found");
    }


    revalidatePath("/dashboard")
    revalidatePath("/applications")
    revalidatePath(`/applications/${applicationId}`)
    revalidatePath("/interviews")
    redirect(`/interviews`)

}
