import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Zaimportuj instancję Prisma

// Fetching USERS (READ)
export async function GET() {
    try {
        const users = await prisma.user.findMany(); // Pobieramy wszystkich użytkowników
        return NextResponse.json(users);
    } catch (error) {
        console.log("ERROR",error)
        return NextResponse.json(
            { error: "Something went wrong! I can not GET users" },
            { status: 500 },
        );
    }
}

// Creating USER (CREATE)
export async function POST(request: Request) {
    try {
        const { username, email, password_hash } = await request.json(); // Oczekujemy tych danych z body

        if (!username || !email || !password_hash) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password_hash,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 },
        );
    }
}

// Edycja użytkownika (UPDATE)
export async function PUT(request: Request) {
    try {
        const { id, username, email, password_hash } = await request.json();

        if (!id || !username || !email || !password_hash) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { username, email, password_hash },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
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
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 },
        );
    }
}
