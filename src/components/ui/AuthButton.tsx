"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/me", { credentials: "include" });
                setIsLoggedIn(res.ok);
            } catch (err) {
                setIsLoggedIn(false);
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        setLoading(true);
        await fetch("/api/logout", { method: "POST" });
        setIsLoggedIn(false);
        router.push("/");
    };

    const handleLoginRedirect = () => {
        router.push("/login");
    };

    if (isLoggedIn === null) return null;

    return isLoggedIn ? (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            {loading ? "Wylogowywanie..." : "Logout"}
        </button>
    ) : (
        <button
            onClick={handleLoginRedirect}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Login
        </button>
    );
}
