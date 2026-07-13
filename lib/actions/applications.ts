"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUserId } from "@/lib/current-user";
import {parseApplicationStatus, parseOptionalDate, parseOptionalHttpUrl, parseRequiredString} from "@/lib/actions/parsers";


export async function createApplication(formData: FormData){
    const userId = await requireUserId();
    const company = parseRequiredString(formData.get("company"), "Company");
    const role = parseRequiredString(formData.get("role"), "Role");
    const status = parseApplicationStatus(formData.get("status"));
    const dateApplied = parseOptionalDate(formData.get("dateApplied"), "Date Applied");
    const url = parseOptionalHttpUrl(formData.get("url"), "URL");
    const nextAction = formData.get("nextAction") as string;
    const notes = formData.get("notes") as string;

    if (company == null || role == null ){
        throw new Error(`Company and role name required`);
    }
    if (!status) {
        throw new Error(`Status name required`);
    }
    let comp = await prisma.company.findFirst({
        where: { name: company, userId },
        orderBy: { id: "desc" },
    });
    if (!comp){
        comp = await prisma.company.create({data: {name: company, userId}});
    }

    await prisma.application.create({
        data: {
            userId,
            companyId: comp.id,
            role,
            status,
            jobUrl: url || null,
            dateApplied: dateApplied || null,
            nextAction: nextAction || null,
            notes: notes || null,

        },
    })
    revalidatePath("/dashboard")
    revalidatePath("/applications")
    redirect(`/dashboard`)

}

export async function updateApplication(formData: FormData){
    const userId = await requireUserId();
    const id = formData.get("id") as string;
    const company = parseRequiredString(formData.get("company"), "Company");
    const role = parseRequiredString(formData.get("role"), "Role");
    const status = parseApplicationStatus(formData.get("status"));
    const dateApplied = parseOptionalDate(formData.get("dateApplied"), "Date Applied");
    const url = parseOptionalHttpUrl(formData.get("url"), "URL");
    const nextAction = formData.get("nextAction") as string;
    const notes = formData.get("notes") as string;

    if (company == null || role == null ){
        throw new Error(`Company and role name required`);
    }
    if (!status) {
        throw new Error(`Status name required`);

    }

    let comp = await prisma.company.findFirst({
        where: { name: company, userId },
        orderBy: { id: "desc" },
    });
    if (!comp){
        comp = await prisma.company.create({data: {name: company, userId}});
    }

    const result = await prisma.application.updateMany({
        where: {id, userId},
        data: {
            companyId: comp.id,
            role,
            status,
            jobUrl: url || null,
            dateApplied: dateApplied ? new Date(dateApplied) : null,
            nextAction: nextAction || null,
            notes: notes || null,

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
