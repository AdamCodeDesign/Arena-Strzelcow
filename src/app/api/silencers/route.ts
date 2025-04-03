import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// creating silencer (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json(
                { error: "Missing name" },
                { status: 400 },
            );
        }

        // Creating silencer
        const newSilencer = await prisma.silencer.create({
            data: {
                name,
            },
            include: {
                guns: true,
            },
        });

        return NextResponse.json(newSilencer, { status: 201 });
    } catch (error) {
        console.error("Error creating silencer:", error);
        return NextResponse.json(
            { error: "Failed to create silencer" },
            { status: 500 },
        );
    }
}

// GET All silencers (READ)
export async function GET() {
    try {
        const silencers = await prisma.silencer.findMany({
            include: {
                guns: true,
            },
        });

        if (silencers.length === 0) {
            return NextResponse.json(
                { message: "No silencers found" },
                { status: 404 },
            );
        }

        return NextResponse.json(silencers);
    } catch (error) {
        console.error("ERROR: Unable to get all silencers", error);
        return NextResponse.json(
            { error: "I can not GET ALL silencers" },
            { status: 500 },
        );
    }
}
