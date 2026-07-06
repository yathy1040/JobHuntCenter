/*
  Warnings:

  - The `completed` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completedAt" TIMESTAMP(3),
ALTER COLUMN "dueAt" DROP NOT NULL,
DROP COLUMN "completed",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
