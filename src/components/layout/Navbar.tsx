"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between w-full">
      <Link href="/">Home</Link>
      {loading ? (
        <span>Ładowanie...</span>
      ) : user ? (
        <>
          <span>Witaj, {user.name}</span>
          <button
            onClick={logout}
            className="ml-4 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <Link href="/login" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
          Login
        </Link>
      )}
    </nav>
  );
}
