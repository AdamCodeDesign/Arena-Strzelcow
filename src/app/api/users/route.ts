import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Zaimportuj instancję Prisma

// Fetching USERS (READ)
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
        return NextResponse.json(users);
    } catch (error) {
        console.log("ERROR", error);
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

// Edycja użytkownika (UPDATE)
export async function PUT(request: Request) {
    try {
        const { id, username, email, passwordHash } = await request.json();

        if (!id || !username || !email || !passwordHash) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { username, email, passwordHash },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log("ERROR:Failed to update user", error);
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 },
        );
    }
}

// Usuwanie użytkownika (DELETE)
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Missing user ID" },
                { status: 400 },
            );
        }

        const deletedUser = await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        console.log("ERROR: Failed to delete user", error);
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 },
        );
    }
}
