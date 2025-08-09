import { create } from "zustand";
import api from "../utils/api";
import type { Card } from "../types/Card";

interface CardStore {
  cards: Card[];
  fetchCards: () => Promise<void>;
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  deleteCard: (id: string) => void;
  updateCard: (updatedCard: Card) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  cards: [],

  fetchCards: async () => {
    try {
      const response = await api.get("/cards");
      const cardsRaw = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.cards)
          ? response.data.cards
          : [];
      const cards = cardsRaw.map((card: any) => ({
        ...card,
        bank: card.issuer ?? '',
        annualFee: Number(card.annualFee),
        loungeCredits: card.loungeCredits && typeof card.loungeCredits === 'object'
          ? {
              used: card.loungeCredits.usedCredits ?? 0,
              total: card.loungeCredits.totalCredits ?? 0
            }
          : undefined
      }));
      set({ cards });
    } catch (error) {
      console.error("Failed to fetch cards: ", error);
      set({ cards: [] });
    }
  },

  setCards: (cards) => set({ cards }),

  addCard: (card) => 
    set((state) => ({
      cards: [card, ...state.cards],
    })),

    deleteCard: (id) => 
      set((state) => ({
        cards: state.cards.filter((card) => card.id !== id),
      })),

      updateCard: (updatedCard) => 
        set((state) => ({
          cards: state.cards.map((card) => 
            card.id === updatedCard.id ? updatedCard : card
          ),
        })),
}));