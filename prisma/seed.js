const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  console.log("Seeding data...");

  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      passwordHash: "hashed_password_goes_here",
    },
  });

  const card1 = await prisma.creditCard.create({
    data: {
      userId: user.id,
      cardName: "HDFC Infinia",
      issuer: "HDFC Bank",
      lastFourDigits: "**** 1234",
      expiresOn: new Date("2032-12-31"),
      billingDay: 10,
      paymentDay: 4,
      isPaid: false,
      annualFee: 1000,
      status: "Active",
    },
  });

  await prisma.loungeCredit.create({
    data: {
      cardId: card1.id,
      totalCredits: 6,
      usedCredits: 2,
    },
  });

  const card2 = await prisma.creditCard.create({
    data: {
      userId: user.id,
      cardName: "ICICI Sapphiro",
      issuer: "ICICI Bank",
      lastFourDigits: "**** 5678",
      billingDay: 15,
      paymentDay: 3,
      expiresOn: new Date("2033-11-30"),
      isPaid: true,
      annualFee: 3500,
      status: "Active",
    },
  });

  await prisma.loungeCredit.create({
    data: {
      cardId: card2.id,
      totalCredits: 4,
      usedCredits: 0,
    },
  });

  console.log("Database has been seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
