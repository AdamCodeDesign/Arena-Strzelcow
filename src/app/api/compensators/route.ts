import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// creating compensator (POST)
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

        // Creating compensator
        const newCompensator = await prisma.compensator.create({
            data: {
                name,
                type,
                material: material ?? null,
            },
            include: {
                guns: true,
            },
        });

        return NextResponse.json(newCompensator, { status: 201 });
    } catch (error) {
        console.error("Error creating compensator:", error);
        return NextResponse.json(
            { error: "Failed to create compensator" },
            { status: 500 },
        );
    }
}

// GET All compensators (READ)
export async function GET() {
    try {
        const compensators = await prisma.compensator.findMany({
            include: {
                guns: true,
            },
        });

        if (compensators.length === 0) {
            return NextResponse.json(
                { message: "No compensators found" },
                { status: 404 },
            );
        }

        return NextResponse.json(compensators);
    } catch (error) {
        console.error("ERROR: Unable to get all compensators", error);
        return NextResponse.json(
            { error: "I can not GET ALL compensators" },
            { status: 500 },
        );
    }
}
