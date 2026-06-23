import { auth } from "@/auth";
import { redirect } from "next/navigation";

type ProtectedLayoutProps = {
    children: React.ReactNode;
};

export default async function ProtectedLayout({
                                                  children,
                                              }: ProtectedLayoutProps) {
    const session = await auth();

    if (!session?.user) {
        redirect("/signin");
    }

    return <>{children}</>;
}