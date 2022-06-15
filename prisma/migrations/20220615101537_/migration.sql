/*
  Warnings:

  - You are about to drop the column `staff_id` on the `attendances` table. All the data in the column will be lost.
  - Added the required column `staff_uid` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_staff_id_fkey";

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "staff_id",
ADD COLUMN     "staff_uid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_staff_uid_fkey" FOREIGN KEY ("staff_uid") REFERENCES "staffs"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
