// app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
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
            // Automatyczne logowanie
            const loginRes = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            });

            if (loginRes.ok) {
                router.push("/profile"); // albo inna strona dla zalogowanego
            } else {
                const data = await loginRes.json();
                setError(
                    data.error ||
                        "Rejestracja ok, ale logowanie się nie powiodło",
                );
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
                    placeholder="Nazwa użytkownika"
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Hasło"
                    onChange={handleChange}
                    required
                    className="input"
                />
                <button type="submit" className="btn">
                    Zarejestruj
                </button>
            </form>
        </div>
    );
}
