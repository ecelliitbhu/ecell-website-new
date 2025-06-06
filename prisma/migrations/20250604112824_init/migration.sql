-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_recruiterId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Recruiter"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
