/*
  Warnings:

  - You are about to drop the column `guildDiscordId` on the `UsersOnGuilds` table. All the data in the column will be lost.
  - You are about to drop the column `userDiscordId` on the `UsersOnGuilds` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guildUserUnique]` on the table `UsersOnGuilds` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guildUserUnique]` on the table `UsersOnGuilds` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guildId` to the `UsersOnGuilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildUserUnique` to the `UsersOnGuilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UsersOnGuilds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UsersOnGuilds` DROP FOREIGN KEY `UsersOnGuilds_guildDiscordId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersOnGuilds` DROP FOREIGN KEY `UsersOnGuilds_userDiscordId_fkey`;

-- AlterTable
ALTER TABLE `UsersOnGuilds` DROP COLUMN `guildDiscordId`,
    DROP COLUMN `userDiscordId`,
    ADD COLUMN `guildId` INTEGER NOT NULL,
    ADD COLUMN `guildUserUnique` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `guildUserUniqueIndex` ON `UsersOnGuilds`(`guildUserUnique`);

-- CreateIndex
CREATE INDEX `UsersOnGuilds_guildId_idx` ON `UsersOnGuilds`(`guildId`);

-- CreateIndex
CREATE INDEX `UsersOnGuilds_userId_idx` ON `UsersOnGuilds`(`userId`);

-- CreateIndex
CREATE INDEX `guildUserIndex` ON `UsersOnGuilds`(`guildId`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `UsersOnGuilds_guildUserUnique_key` ON `UsersOnGuilds`(`guildUserUnique`);

-- AddForeignKey
ALTER TABLE `UsersOnGuilds` ADD CONSTRAINT `UsersOnGuilds_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnGuilds` ADD CONSTRAINT `UsersOnGuilds_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
