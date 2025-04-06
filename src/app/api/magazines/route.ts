import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// creating magazine (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, capacity, material, weight } = body;

        if (!name || !capacity || !material) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 },
            );
        }

        // Creating magazine
        const newMagazine = await prisma.magazine.create({
            data: {
                name,
                capacity,
                material,
                weight: weight ?? null,
            },
            include: {
                gun: true,
            },
        });

        return NextResponse.json(newMagazine, { status: 201 });
    } catch (error) {
        console.error("Error creating magazine:", error);
        return NextResponse.json(
            { error: "Failed to create magazine" },
            { status: 500 },
        );
    }
}

// GET All magazines (READ)
export async function GET() {
    try {
        const magazines = await prisma.magazine.findMany({
            include: {
                gun: true,
            },
        });

        if (magazines.length === 0) {
            return NextResponse.json(
                { message: "No magazines found" },
                { status: 404 },
            );
        }

        return NextResponse.json(magazines);
    } catch (error) {
        console.error("ERROR: Unable to get all magazines", error);
        return NextResponse.json(
            { error: "I can not GET ALL magazines" },
            { status: 500 },
        );
    }
}
