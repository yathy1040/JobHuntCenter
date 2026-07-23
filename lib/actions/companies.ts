"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUserId } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { parseCompanyData } from "@/lib/actions/company-data";

export async function updateCompany(formData: FormData) {
    const userId = await requireUserId();
    const id = formData.get("id");

    if (typeof id !== "string" || id.trim() === "") {
        throw new Error("Company id is required");
    }

    const data = parseCompanyData(formData);
    const result = await prisma.company.updateMany({
        where: {
            id,
            userId,
        },
        data,
    });

    if (result.count === 0) {
        throw new Error("Company not found");
    }

    revalidatePath("/companies");
    revalidatePath(`/companies/${id}`);
    redirect(`/companies/${id}`);
}

export async function deleteCompany(id: string) {
    const userId = await requireUserId();

    await prisma.company.deleteMany({
        where: {
            id,
            userId,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/applications");
    revalidatePath("/companies");

    redirect("/companies");
}
