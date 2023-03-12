/*
  Warnings:

  - A unique constraint covering the columns `[openaiToken]` on the table `Guild` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Guild` ADD COLUMN `openaiToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Guild_openaiToken_key` ON `Guild`(`openaiToken`);
