import {
    Pencil,
    Trash2,
    CreditCard,
    ClipboardList
} from "lucide-react"
import type { Card } from "../types/Card"

export default function CardItem({
    cardName,
    bank,
    network,
    lastFourDigits,
    billingDay,
    paymentDay,
    isPaid,
    annualFee,
    status,
    loungeCredits
}: Card) {
    return (
        <div className="bg-white border rounded-x1 shadow-sm p-4">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                        <CreditCard className="text-purple-600" size={20} />
                        {cardName}
                    </div>
                    <div className="text-sm text-gray-500">
                        {bank} • {network} • **** {lastFourDigits}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                        {status}
                    </span>
                    <ClipboardList size={18} className="cursor-pointer text-gray-500" />
                    <Pencil size={18} className="cursor-pointer text-gray-500" />
                    <Trash2 size={18} className="cursor-pointer text-red-500" />
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm text-gray-700">
                <div>
                    <div className="text-gray-500">Billing Date</div>
                    <div>{billingDay}</div>
                </div>
                <div>
                    <div className="text-gray-500">Payment Due</div>
                    <div className="flex items-center gap-1">
                        {paymentDay} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{isPaid ? 'Paid' : 'On Time'}</span>
                    </div>
                </div>
                <div>
                    <div className="text-gray-500">Annual Fee</div>
                    <div>${typeof annualFee === 'number' ? annualFee.toFixed(2) : annualFee}</div>
                </div>
                <div>
                    <div className="text-gray-500">Lounge Credits</div>
                    <div>
                        {loungeCredits && typeof loungeCredits.used === 'number' && typeof loungeCredits.total === 'number'
                            ? `${loungeCredits.total - loungeCredits.used} remaining`
                            : 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    )
}