"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-xl mb-4">Zaloguj się</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    className="w-full mb-3 p-2 border"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    {loading ? "Logowanie..." : "Zaloguj się"}
                </button>
                <div>
                    <p>
                        Nie masz konta?{" "}
                        <Link href="/register">Zarejestruj się!</Link>
                    </p>
                </div>
            </form>
        </>
    );
}
