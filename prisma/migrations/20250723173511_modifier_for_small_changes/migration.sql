/*
  Warnings:

  - You are about to drop the `CreditCards` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CreditCards" DROP CONSTRAINT "CreditCards_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoungeCredit" DROP CONSTRAINT "LoungeCredit_cardId_fkey";

-- AlterTable
ALTER TABLE "LoungeCredit" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "CreditCards";

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "lastFourDigits" TEXT NOT NULL,
    "expiresOn" TIMESTAMP(3) NOT NULL,
    "billingDay" INTEGER NOT NULL,
    "paymentDay" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "annualFee" DECIMAL(65,30) NOT NULL,
    "status" "CardStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoungeCredit" ADD CONSTRAINT "LoungeCredit_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CreditCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
