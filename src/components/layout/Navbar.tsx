"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, logout, loading } = useAuth();

    return (
        <nav className="p-1 text-white flex justify-between w-full">
            <Link href="/">Home</Link>
            {loading ? (
                <span>Ładowanie...</span>
            ) : user ? (
                <>
                    <Link href="/profile">Profil</Link>
                    <Link href="/club">Klub</Link>
                    <Link href="/guns">Guns</Link>
                    <span>Witaj, {user.name}</span>
                    <button
                        onClick={logout}
                        className="ml-4 bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                        Logout
                    </button>
                </>
            ) : (
                <Link
                    href="/login"
                    className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                    Login
                </Link>
            )}
        </nav>
    );
}
