import { config as dotenvConfig } from "dotenv";
import { Client } from "pg";

dotenvConfig({ path: ".env.local" });

const DEFAULT_DATABASE_URL =
    "postgresql://postgres:postgres@127.0.0.1:5432/job_hunt_command_center?schema=public";

// Deleting the company cascades to any application still attached to it (see
// prisma/schema.prisma), so this is enough to remove everything a test created,
// including the company that createApplicationViaUi auto-creates - deleting only
// the application would leave that company behind as an orphan.
export async function deleteApplicationAndCompany(companyName: string): Promise<void> {
    const client = new Client({
        connectionString: process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL,
    });
    await client.connect();

    try {
        await client.query(`DELETE FROM "Company" WHERE name = $1`, [companyName]);
    } finally {
        await client.end();
    }
}

export async function deleteTaskByTitle(title: string): Promise<void> {
    const client = new Client({
        connectionString: process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL,
    });
    await client.connect();

    try {
        await client.query(`DELETE FROM "Task" WHERE title = $1`, [title]);
    } finally {
        await client.end();
    }
}
