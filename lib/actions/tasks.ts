"use server";
import { requireUserId } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
    const userId = await requireUserId();
    const applicationIdValue = formData.get("applicationId");

    const applicationId =
        typeof applicationIdValue === "string" && applicationIdValue.length > 0
            ? applicationIdValue
            : null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueAt = formData.get("dueAt") as string;

    if (title == null) {
        throw new Error(`Stage and schedule time required`);
    }
    if (applicationId != null) {
        const application = await prisma.application.findUnique({
            where: {
                id: applicationId,
                userId,
            },
            select: {
                id: true,
            }
        })
        if (!application) {
            throw new Error(`Unable to find application with id ${applicationId}`);
        }
        else {
            await prisma.task.create({
                data: {
                    userId,
                    applicationId,
                    title,
                    description: description || null,
                    dueAt: dueAt ? new Date(dueAt) : null

                }
            })
        }
    }
    else {

        await prisma.task.create({
            data: {
                userId,
                applicationId,
                title,
                description: description || null,
                dueAt: dueAt ? new Date(dueAt) : null

            }
        })
    }


    revalidatePath("/tasks")
    redirect(`/tasks`)

}

export async function updateTaskCompletion(id: string, completed: boolean) {
    const userId = await requireUserId();

    await prisma.task.updateMany({
        where: {
            id,
            userId,
        },
        data: {
            completed,
            completedAt: completed ? new Date() : null,
        },
    });

    revalidatePath("/tasks");
}

export async function deleteTask(id: string) {
    const userId = await requireUserId();

    await prisma.task.deleteMany({
        where: {
            id,
            userId,
        },
    });

    revalidatePath("/tasks");
}
