// src/app/profile/page.tsx
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import LogoutButton from "@/components/ui/LogoutButton";
import ProfileInfo from "@/components/ui/ProfileInfo";
import Avatar from "@/components/ui/Avatar";

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
      <Avatar name={user.name}/>
      <ProfileInfo name={user.name} email={user.email}/>
      <LogoutButton />
    </div>
  );
}
