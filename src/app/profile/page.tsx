// src/app/profile/page.tsx
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function ProfilePage() {
  const token = cookies().get("token")?.value;
  const user = token ? verifyJWT(token) : null;

  if (!user) {
    return (
      <div className="p-6 text-center text-red-600">
        Nie jesteś zalogowany.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-2">Witaj, {user.name}!</h1>
      <p className="text-gray-600 mb-4">Email: {user.email}</p>
      <LogoutButton />
    </div>
  );
}
