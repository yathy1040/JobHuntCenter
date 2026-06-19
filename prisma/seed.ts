import "dotenv/config";
import {PrismaClient} from "@/app/generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({adapter});

const companies = [
    {
        name: "Shopify",
        website: "https://www.shopify.com",
        industry: "E-commerce",
        location: "Canada",
        applications: {
            create: [
                {
                    role: "Frontend Developer",
                    status: "APPLIED" as const,
                    dateApplied: new Date("2026-05-01"),
                    nextAction: "Follow up next week",
                    jobUrl: "https://example.com/shopify-frontend",
                },
            ],
        },
    },
    {
        name: "Hootsuite",
        industry: "Social Media Software",
        location: "Remote",
        applications: {
            create: [
                {
                    role: "Software Developer",
                    status: "INTERVIEW" as const,
                    dateApplied: new Date("2026-04-28"),
                    nextAction: "Prepare for technical interview",
                },
            ],
        },
    },
    {
        name: "RBC",
        industry: "Finance",
        location: "Toronto, ON",
        applications: {
            create: [
                {
                    role: "Full-Stack Developer",
                    status: "WISHLIST" as const,
                    nextAction: "Tailor resume",
                },
            ],
        },
    },
    {
        name: "OpenText",
        industry: "Enterprise Software",
        location: "Waterloo, ON",
        applications: {
            create: [
                {
                    role: "Backend Developer",
                    status: "REJECTED" as const,
                    dateApplied: new Date("2026-04-20"),
                    nextAction: "Archive application",
                },
            ],
        },
    },
    {
        name: "Wealthsimple",
        industry: "Fintech",
        location: "Toronto, ON",
        applications: {
            create: [
                {
                    role: "Software Engineer",
                    status: "OFFER" as const,
                    dateApplied: new Date("2026-04-15"),
                    nextAction: "Review offer details",
                },
            ],
        },
    },
];

async function main() {
    await prisma.application.deleteMany();
    await prisma.company.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: "demo@example.com",
            name: "Demo User",
        },
    });

    for (const company of companies) {
        await prisma.company.create({
            data: {
                ...company,
                userId: user.id,
                applications: {
                    create: company.applications.create.map((application) => ({
                        ...application,
                        userId: user.id,
                    })),
                },
            },
        });
    }

    console.log("Database seeded successfully.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
