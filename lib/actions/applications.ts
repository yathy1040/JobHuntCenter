"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {ApplicationStatusLabel, type Application} from "@/lib/types";
import type {ApplicationStatus as PrismaApplicationStatus} from "@/app/generated/prisma/enums";

function formatStatus(status: PrismaApplicationStatus):ApplicationStatusLabel {
    const statusMap: Record<PrismaApplicationStatus, ApplicationStatusLabel> = {
        WISHLIST: "Wishlist",
        APPLIED: "Applied",
        INTERVIEW: "Interview",
        OFFER: "Offer",
        REJECTED: "Rejected",
    };

    return statusMap[status];
}



export async function createApplication(formData: FormData){
    const company = formData.get("company") as string;
    const role = formData.get("role") as string;
    const status = formData.get("status") as
    | "WISHLIST"
    | "APPLIED"
    | "INTERVIEW"
    | "OFFER"
    | "REJECTED";
    const dateApplied = formData.get("dateApplied") as string;
    const url = formData.get("url") as string;
    const nextAction = formData.get("nextAction") as string;
    const notes = formData.get("notes") as string;

    if (company == null || role == null ){
        throw new Error(`Company and role name required`);
    }
    if (!status) {
        throw new Error(`Status name required`);
    }
    const comp = await prisma.company.create({data: {name: company}});

    await prisma.application.create({
        data: {
            companyId: comp.id,
            role,
            status,
            jobUrl: url || null,
            dateApplied: dateApplied ? new Date(dateApplied) : null,
            nextAction: nextAction || null,
            notes: notes || null,

        },
    })
    revalidatePath("/dashboard")
    revalidatePath("/applications")
    redirect(`/dashboard`)

}

export async function updateApplication(formData: FormData){
    const id = formData.get("id") as string;
    const company = formData.get("company") as string;
    const role = formData.get("role") as string;
    const status = formData.get("status") as
        | "WISHLIST"
        | "APPLIED"
        | "INTERVIEW"
        | "OFFER"
        | "REJECTED";
    const dateApplied = formData.get("dateApplied") as string;
    const url = formData.get("url") as string;
    const nextAction = formData.get("nextAction") as string;
    const notes = formData.get("notes") as string;

    if (company == null || role == null ){
        throw new Error(`Company and role name required`);
    }
    if (!status) {
        throw new Error(`Status name required`);

    }

    let comp = await prisma.company.findFirst({
        where: { name: company },
        orderBy: { id: "desc" },
    });
    if (!comp){
        comp = await prisma.company.create({data: {name: company}});
    }

    await prisma.application.update({
        where: {id: id},
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

    revalidatePath("/dashboard")
    revalidatePath("/applications")
    revalidatePath(`/applications/${id}`)
    redirect(`/applications/${id}`)

}

export async function deleteApplication(id: string) {
    await prisma.application.delete({
        where: {
            id,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/applications");

    redirect("/applications");
}
