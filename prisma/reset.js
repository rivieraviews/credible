//Dev-only script to reset the database. Use with caution!

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetDatabase() {
  console.log("Resetting database. This will delete ALL data.");

  await prisma.loungeCredit.deleteMany();
  await prisma.creditCard.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database reset complete.");
}

resetDatabase()
  .catch((e) => {
    console.error("Error resetting database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
