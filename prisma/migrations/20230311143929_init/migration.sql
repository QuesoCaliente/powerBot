/*
  Warnings:

  - The primary key for the `Guild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Guild` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to drop the column `guildId` on the `UsersOnGuilds` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UsersOnGuilds` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[discordId]` on the table `Guild` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discordId` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discordId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildDiscordId` to the `UsersOnGuilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userDiscordId` to the `UsersOnGuilds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UsersOnGuilds` DROP FOREIGN KEY `UsersOnGuilds_guildId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersOnGuilds` DROP FOREIGN KEY `UsersOnGuilds_userId_fkey`;

-- AlterTable
ALTER TABLE `Guild` DROP PRIMARY KEY,
    ADD COLUMN `discordId` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `discordId` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UsersOnGuilds` DROP COLUMN `guildId`,
    DROP COLUMN `userId`,
    ADD COLUMN `guildDiscordId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userDiscordId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Guild_discordId_key` ON `Guild`(`discordId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_discordId_key` ON `User`(`discordId`);

-- AddForeignKey
ALTER TABLE `UsersOnGuilds` ADD CONSTRAINT `UsersOnGuilds_guildDiscordId_fkey` FOREIGN KEY (`guildDiscordId`) REFERENCES `Guild`(`discordId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnGuilds` ADD CONSTRAINT `UsersOnGuilds_userDiscordId_fkey` FOREIGN KEY (`userDiscordId`) REFERENCES `User`(`discordId`) ON DELETE RESTRICT ON UPDATE CASCADE;
