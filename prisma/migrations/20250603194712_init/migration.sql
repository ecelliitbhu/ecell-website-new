/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('STUDENT', 'RECRUITER', 'AMBASSADOR');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_recruiterId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "CampusAmbassador" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL,
    "collegeYear" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "POR" TEXT NOT NULL,
    "reasonToJoin" TEXT NOT NULL,
    "roleInStudentBody" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "roleInEcell" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "contribution" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "referrals" TEXT NOT NULL DEFAULT '{}',

    CONSTRAINT "CampusAmbassador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "lastDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "submitted" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER NOT NULL DEFAULT 100,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "submission" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissingEmails" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "logged_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MissingEmails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CampusAmbassador_userId_key" ON "CampusAmbassador"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CampusAmbassador_email_key" ON "CampusAmbassador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_userEmail_taskId_key" ON "Submission"("userEmail", "taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTasks_AB_unique" ON "_UserTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTasks_B_index" ON "_UserTasks"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampusAmbassador" ADD CONSTRAINT "CampusAmbassador_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTasks" ADD CONSTRAINT "_UserTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "CampusAmbassador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTasks" ADD CONSTRAINT "_UserTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
