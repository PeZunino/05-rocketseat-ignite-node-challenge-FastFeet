/*
  Warnings:

  - You are about to drop the column `admin_id` on the `packages` table. All the data in the column will be lost.
  - You are about to drop the column `courier_id` on the `packages` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_courier_id_fkey";

-- AlterTable
ALTER TABLE "packages" DROP COLUMN "admin_id",
DROP COLUMN "courier_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
