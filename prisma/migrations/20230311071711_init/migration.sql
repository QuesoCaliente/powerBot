/*
  Warnings:

  - You are about to drop the column `serverId` on the `Guild` table. All the data in the column will be lost.
  - Added the required column `guildId` to the `Guild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Guild` DROP COLUMN `serverId`,
    ADD COLUMN `guildId` VARCHAR(191) NOT NULL,
    MODIFY `nsfw` INTEGER NULL;
