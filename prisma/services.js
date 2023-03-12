import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUserAndGuild(
  userId,
  guildId
) {
  // Creamos o conectamos a un usuario existente por su ID de Discord
  const user = await prisma.user.upsert({
    where: { discordId: userId }, // ID de Discord del usuario
    update: {},
    create: {
      discordId: userId, // Si el usuario no existe, lo creamos
    },
  });

  // Creamos un nuevo servidor
  const newGuild = await prisma.guild.upsert({
    where: { discordId: guildId }, // ID de Discord del servidor
    update: {},
    create: {
      discordId: guildId, // Si el servidor no existe, lo creamos
      prefix: process.env.PREFIX
    },
  });

  // Agregamos el usuario al servidor
  await prisma.usersOnGuilds.upsert({
    where: {
      guildUserUnique: `${guildId}_${userId}`
    },
    update: {},
    create: {
      user: {
        connect: {
          id: user.id,
        },
      },
      guild: {
        connect: {
          id: newGuild.id,
        },

      },
      guildUserUnique: `${guildId}_${userId}`
    },
  });

  await prisma.$disconnect();
}

export async function createGuild(guildId) {
  const newGuild = await prisma.guild.upsert({
    where: { discordId: guildId }, // ID de Discord del servidor
    update: {},
    create: {
      discordId: guildId, // Si el servidor no existe, lo creamos
      prefix: process.env.PREFIX
    },
  });
  await prisma.$disconnect();
}


export async function getServer(guildId) {
  const guild = await prisma.guild.findUnique({
    where: { discordId: guildId },
  });
  await prisma.$disconnect();
  return guild;
}

export async function setPrefix(guildId, prefix) {
  const guild = await prisma.guild.update({
    where: { discordId: guildId },
    data: {
      prefix,
    },
  });
  await prisma.$disconnect();
  return guild;
}

export async function setOpenAiKey(guildId, key) {
  const guild = await prisma.guild.update({
    where: { discordId: guildId },
    data: {
      openaiToken: key,
    },
  });
  await prisma.$disconnect();
  return guild;
}