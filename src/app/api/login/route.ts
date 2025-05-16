import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, name: user.username, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ message: "Zalogowano" });
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dni
    });

    console.log("Zalogowano użytkownika:", user.email);
    return res;
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
    return NextResponse.json(
      { error: "Coś poszło nie tak podczas logowania" },
      { status: 500 }
    );
  }
}
