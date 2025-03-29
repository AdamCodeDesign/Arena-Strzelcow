import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Zaimportuj instancję Prisma

// Fetching ALL USERS (READ)
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                events: true,
                competitions: true,
                EventParticipants: true,
                CompetitionParticipants: true,
                Result: true,
                AvgResult: true,
            },
        }); // Pobieramy wszystkich użytkowników

        if (users.length === 0) {
            return NextResponse.json(
                { message: "No events found" },
                { status: 404 },
            );
        }

        return NextResponse.json(users);
    } catch (error) {
        console.log("ERROR: Unable to get all users", error);
        return NextResponse.json(
            { error: "Something went wrong! I can not GET users" },
            { status: 500 },
        );
    }
}

// Creating USER (CREATE)
export async function POST(request: Request) {
    try {
        const { username, email, passwordHash } = await request.json(); // Oczekujemy tych danych z body

        if (!username || !email || !passwordHash) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.log("ERROR:Failed to create user", error);
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 },
        );
    }
}
