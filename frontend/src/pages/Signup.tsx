import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signup = useAuthStore((state) => state.signup) as (name: string, email: string, password: string) => Promise<void>;
    let navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup(name, email, password);
            navigate("/");
        } catch (err) {
            alert("Signup failed.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
                <h2 className="text-2x1 mb-4 font-bold ttext-center">Signup</h2>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />

                <button type="submit" className="w-full bg-primary text-white py-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
}