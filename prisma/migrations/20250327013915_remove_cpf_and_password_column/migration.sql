/*
  Warnings:

  - You are about to drop the column `cpf` on the `receivers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `receivers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "receivers_cpf_key";

-- AlterTable
ALTER TABLE "receivers" DROP COLUMN "cpf",
DROP COLUMN "password";
