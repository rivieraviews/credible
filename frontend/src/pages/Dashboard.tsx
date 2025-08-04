import { useEffect, useState } from "react";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import { CreditCard, CalendarCheck, Plane, Clock } from "lucide-react";
import { getDashboardData } from "../services/dashboard";

type DashboardData = {
  totalCards: number;
  dueThisMonth: number;
  loungeCredits: { used: number; total: number };
  nextPayment: string;
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardData();
        setData(res);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6">
        {loading ? (
          <div className="text-center text-muted-foreground text-gray-500">Loading...</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              icon={<CreditCard />}
              label="Total Cards"
              value={data?.totalCards ?? "-"}
              color="text-indigo-600"
            />
            <DashboardCard
              icon={<CalendarCheck />}
              label="Due This Month"
              value={data?.dueThisMonth ?? "-"}
              color="text-rose-600"
            />
            <DashboardCard
              icon={<Plane />}
              label="Lounge Credits"
              value={`${data?.loungeCredits?.used ?? "-"} / ${data?.loungeCredits?.total ?? "-"}`}
              color="text-emerald-600"
            />
            <DashboardCard
              icon={<Clock />}
              label="Next Payment"
              value={new Date(data?.nextPayment ?? "").toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
              color="text-yellow-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}