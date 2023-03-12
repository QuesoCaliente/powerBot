/*
  Warnings:

  - The primary key for the `Guild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `guildId` on the `Guild` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `UsersOnGuilds` DROP FOREIGN KEY `UsersOnGuilds_id_fkey`;

-- DropForeignKey
ALTER TABLE `UsersOnGuilds` DROP FOREIGN KEY `UsersOnGuilds_userId_fkey`;

-- DropIndex
DROP INDEX `UsersOnGuilds_guildId_fkey` ON `UsersOnGuilds`;

-- AlterTable
ALTER TABLE `Guild` DROP PRIMARY KEY,
    DROP COLUMN `guildId`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `userId`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UsersOnGuilds` MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `guildId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `UsersOnGuilds` ADD CONSTRAINT `UsersOnGuilds_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnGuilds` ADD CONSTRAINT `UsersOnGuilds_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
