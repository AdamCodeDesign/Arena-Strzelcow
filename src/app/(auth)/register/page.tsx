"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
    const router = useRouter();
    const { setUser } = useAuth(); // <- z kontekstu
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            const loginRes = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            });

            if (loginRes.ok) {
                const meRes = await fetch("/api/me"); // pobierz aktualne dane
                if (meRes.ok) {
                    const userData = await meRes.json();
                    setUser(userData); // aktualizujemy kontekst
                    router.push("/profile");
                } else {
                    setError("Zalogowano, ale nie udało się pobrać danych użytkownika");
                }
            } else {
                const data = await loginRes.json();
                setError(data.error || "Logowanie się nie powiodło");
            }
        } else {
            const data = await res.json();
            setError(data.error || "Coś poszło nie tak");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl mb-4">Zarejestruj się</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="username"
                    placeholder="Nazwa użytkownika lub pseudonim"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded mb-4"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded mb-4"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Hasło"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded mb-4"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Zarejestruj
                </button>
            </form>
        </div>
    );
}
