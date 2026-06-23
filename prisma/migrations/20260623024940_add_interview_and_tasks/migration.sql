-- CreateEnum
CREATE TYPE "InterviewStage" AS ENUM ('RECRUITER_SCREEN', 'HIRING_MANAGER', 'TECHNICAL', 'BEHAVIOURAL', 'SYSTEM_DESIGN', 'FINAL', 'OTHER');

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "stage" "InterviewStage" NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER,
    "notes" TEXT,
    "format" TEXT,
    "location" TEXT,
    "meetingUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "completed" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
