//to add or edit a credit card
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { useCardStore } from "../store/useCardStore";

export default function CardForm() {
    const { id } = useParams();
    let navigate = useNavigate();
    const cards = useCardStore((state) => state.cards);
    const updateCardInStore = useCardStore((state) => state.updateCard);

    const existingCard = cards.find((c) => c.id === id);

    const [formData, setFormData] = useState({
        cardName: "",
        issuer: "",
        lastFourDigits: "",
        expiresOn: "",
        billingDay: "",
        paymentDay: "",
        isPaid: false,
        annualFee: "",
        status: "",
    });

    useEffect(() => {
        if (existingCard) {
            setFormData({
                cardName: existingCard.cardName,
                issuer: existingCard.issuer,
                lastFourDigits: existingCard.lastFourDigits,
                expiresOn: existingCard.expiresOn.split("T")[0],
                billingDay: existingCard.billingDay.toString(),
                paymentDay: existingCard.paymentDay.toString(),
                isPaid: existingCard.isPaid,
                annualFee: existingCard.annualFee.toString(),
                status: existingCard.status,
            })
        }
    }, [existingCard]);

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                annualFee: Number(formData.annualFee),
                billingDay: Number(formData.billingDay),
                paymentDay: Number(formData.paymentDay),
                expiresOn: new Date(formData.expiresOn),
            };
            if (id) {
                //edit
                const res = await api.put(`/cards/${id}`, payload);
                updateCardInStore(res.data);
            } else {
                //add
                await api.post("/cards", payload);
            }

      navigate("/");
        } catch (err) {
            setError("Failed to add card. Check your inputs and try again.");
            console.error(err);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Card</h2>
            <form onSubmit={handleSubmit} className="grid gap-4">

                <input name="cardName" placeholder="Card Name" onChange={handleChange} required />

                <input name="issuer" placeholder="Issuer Bank" onChange={handleChange} required />
                
                <input name="lastFourDigits" placeholder="Last 4 Digits" onChange={handleChange} maxLength={4} required />
                
                <input name="expiresOn" type="date" placeholder="Expiry Date" onChange={handleChange} required />
                
                <input name="billingDay" type="number" placeholder="Billing Day (1-31)" onChange={handleChange} required />
                
                <input name="paymentDay" type="number" placeholder="Payment Day (1-31)" onChange={handleChange} required />
                
                <input name="annualFee" type="number" placeholder="Annual Fee" onChange={handleChange} required />
                
                <select name="status" onChange={handleChange} required>
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                
                <label>
                    <input name="isPaid" type="checkbox" onChange={handleChange} /> Mark as Paid
                </label>

                {error && <p className="text-red-600">{error}</p>}

                <button type="submit" className="bg-primary text-white py-2 rounded">Add Card</button>
            </form>
        </div>
    );
}