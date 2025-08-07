import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

export default function Header() {
    const user = useAuthStore((state) => state.user);
    const fetchUser = useAuthStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    
    return (
        <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
            <h1 className="text-2xl font-bold text-gray-900">Credible: A CC Management System</h1>
            <div className="flex gap-4 items-center">
                <Link to="/add-card">
                    <button className="px-4 py-2 rounded bg-primary text-white">+ Add Card</button>
                </Link>
                <div className="font-medium text-gray-800">{user?.name ?? "Guest"}</div>
            </div>
        </header>
    );
}