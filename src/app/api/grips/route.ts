import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// creating grip (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, type, material } = body;

        if (!name || !type) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 },
            );
        }

        // Creating grip
        const newGrip = await prisma.grip.create({
            data: {
                name,
                type,
                material: material ?? null,
            },
            include: {
                gun: true,
            },
        });

        return NextResponse.json(newGrip, { status: 201 });
    } catch (error) {
        console.error("Error creating grip:", error);
        return NextResponse.json(
            { error: "Failed to create grip" },
            { status: 500 },
        );
    }
}

// GET All grips (READ)
export async function GET() {
    try {
        const grips = await prisma.grip.findMany({
            include: {
                guns: true,
            },
        });

        if (grips.length === 0) {
            return NextResponse.json(
                { message: "No grips found" },
                { status: 404 },
            );
        }

        return NextResponse.json(grips);
    } catch (error) {
        console.error("ERROR: Unable to get all grips", error);
        return NextResponse.json(
            { error: "I can not GET ALL grips" },
            { status: 500 },
        );
    }
}
