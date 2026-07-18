"use server";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {requireUserId} from "@/lib/current-user";
import {parseApplicationData} from "@/lib/actions/application-data";

export async function createApplication(formData: FormData){


    const userId = await requireUserId();
    const data = parseApplicationData(formData);


    let comp = await prisma.company.findFirst({
        where: { name: data.company, userId },
        orderBy: { id: "desc" },
    });
    if (!comp){
        comp = await prisma.company.create({data: {name: data.company, userId}});
    }

    await prisma.application.create({
        data: {
            userId,
            companyId: comp.id,
            role: data.role,
            status: data.status,
            jobUrl: data.url || null,
            dateApplied: data.dateApplied || null,
            nextAction: data.nextAction || null,
            notes: data.notes || null,

        },
    })
    revalidatePath("/dashboard")
    revalidatePath("/applications")
    redirect(`/dashboard`)

}

export async function updateApplication(formData: FormData){
    const userId = await requireUserId();
    const id = formData.get("id") as string;
    const data = parseApplicationData(formData);

    let comp = await prisma.company.findFirst({
        where: { name: data.company, userId },
        orderBy: { id: "desc" },
    });
    if (!comp){
        comp = await prisma.company.create({data: {name: data.company, userId}});
    }

    const result = await prisma.application.updateMany({
        where: {id, userId},
        data: {
            companyId: comp.id,
            role: data.role,
            status: data.status,
            jobUrl: data.url || null,
            dateApplied: data.dateApplied || null,
            nextAction: data.nextAction || null,
            notes: data.notes || null,

        }
    })

    if (result.count === 0) {
        throw new Error("Application not found");
    }

    revalidatePath("/dashboard")
    revalidatePath("/applications")
    revalidatePath(`/applications/${id}`)
    redirect(`/applications/${id}`)

}

export async function deleteApplication(id: string) {
    const userId = await requireUserId();

    await prisma.application.deleteMany({
        where: {
            id,
            userId,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/applications");

    redirect("/applications");
}
