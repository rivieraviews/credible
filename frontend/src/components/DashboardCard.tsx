import type { ReactNode } from 'react';

interface DashboardCardProps {
    icon: ReactNode;
    label: string;
    value: string | number;
    color?: string;
}

export default function DashboardCard({ icon, label, value, color = "text-primary" }: DashboardCardProps) {
    return (
        <div className="flex flex-col gap-2 p-4 rounded-xl shadow bg-white min-w-[120px]">
            <div className={`text-3xl ${color}`}>{icon}</div>
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-xl font-semibold text-gray-900">{value}</div>
        </div>
    );
}