import { useEffect, useState } from "react";
import { useCardStore } from "../store/useCardStore";
import CardItem from "./CardItem";
import type { Card } from "../types/Card";

export default function CreditCardList() {
    const cards = useCardStore((state) => state.cards);
    const fetchCards = useCardStore((state) => state.fetchCards);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<Card[]>([]);

    useEffect(() => {
        fetchCards()
    }, [fetchCards])

    useEffect(() => {
        setFiltered(
            Array.isArray(cards)
            ?cards.filter((card: Card) => 
                card.cardName.toLowerCase().includes(search.toLowerCase())
            )
            : []
        )
    }, [search, cards])

    console.log('CreditCardList: cards from store', cards);
    console.log('CreditCardList: filtered cards', filtered);
    return (
        <section className="mt-10 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-x1 font-semibold text-gray-800">Your Credit Cards</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search for a card"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        className="border px-3 py-2 rounded text-gray-800"
                    />
                    <select className="border px-3 py-2 rounded text-gray-800">
                        <option value="">All Cards</option>
                        {/* other filters, eventually */}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {filtered.length === 0 ? (
                    <div className="text-gray-500 text-center">No cards found.</div>
                ) : (
                    filtered.map((card: Card) => (
                        <CardItem key={card.id} {...card} />
                    ))
                )}
            </div>
        </section>
    )
}