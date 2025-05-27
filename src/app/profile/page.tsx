// src/app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import ProfileInfo from "@/components/ui/ProfileInfo";
import Avatar from "@/components/ui/Avatar";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(
        null,
    );
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/me", { credentials: "include" });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    // brak zalogowania -> przekieruj
                    router.push("/login");
                }
            } catch (err) {
                router.push("/login");
            } finally {
                // 🔄 możesz użyć router.refresh() tu, jeśli musisz
                router.refresh();
            }
        };

        fetchUser();
    }, [router]);

    if (!user) {
        return (
            <div className="p-6 text-center text-red-600">
                Nie jesteś zalogowany.
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <Avatar name={user.name} />
            <ProfileInfo name={user.name} email={user.email} />
        </div>
    );
}
