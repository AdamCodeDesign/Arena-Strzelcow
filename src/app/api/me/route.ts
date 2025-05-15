// src/app/api/me/route.ts
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth"; // Twoja funkcja weryfikująca token

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const user = verifyJWT(token);
    return new Response(JSON.stringify(user));
  } catch {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
