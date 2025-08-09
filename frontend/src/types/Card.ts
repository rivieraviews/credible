export interface Card {
  id: string;
  cardName: string;
  issuer: string;
  lastFourDigits: string;
  expiresOn: string; // ISO date string
  billingDay: number;
  paymentDay: number;
  isPaid: boolean;
  annualFee: number;
  status: string;
  loungeCredits?: {
    used: number;
    total: number;
  };
  bank?: string;
  network?: string;
  loungeRemaining?: number;
}