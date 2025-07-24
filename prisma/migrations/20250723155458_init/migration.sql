-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('Active', 'Inactive', 'Closed', 'Expired');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "lastFourDigits" TEXT NOT NULL,
    "billingDay" INTEGER NOT NULL,
    "paymentDay" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "annualFee" BOOLEAN NOT NULL,
    "status" "CardStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoungeCredit" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "totalCredits" INTEGER NOT NULL,
    "usedCredits" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoungeCredit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoungeCredit_cardId_key" ON "LoungeCredit"("cardId");

-- AddForeignKey
ALTER TABLE "CreditCards" ADD CONSTRAINT "CreditCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoungeCredit" ADD CONSTRAINT "LoungeCredit_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CreditCards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
