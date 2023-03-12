-- DropForeignKey
ALTER TABLE `UsersOnGuilds` DROP FOREIGN KEY `UsersOnGuilds_guildId_fkey`;

-- AddForeignKey
ALTER TABLE `UsersOnGuilds` ADD CONSTRAINT `UsersOnGuilds_id_fkey` FOREIGN KEY (`id`) REFERENCES `Guild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
