/*
  Warnings:

  - The values [DELIVERYMAN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `deliveryman_id` on the `packages` table. All the data in the column will be lost.
  - Added the required column `courier_id` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'COURIER');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_deliveryman_id_fkey";

-- AlterTable
ALTER TABLE "packages" DROP COLUMN "deliveryman_id",
ADD COLUMN     "courier_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
