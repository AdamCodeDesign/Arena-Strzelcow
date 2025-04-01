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

// GET All scopes (READ)
export async function GET() {
    try {
        const scopes = await prisma.scope.findMany({
            include: {
                guns: true,
            },
        });

        if (scopes.length === 0) {
            return NextResponse.json(
                { message: "No scopes found" },
                { status: 404 },
            );
        }

        return NextResponse.json(scopes);
    } catch (error) {
        console.error("ERROR: Unable to get all scopes", error);
        return NextResponse.json(
            { error: "I can not GET ALL scopes" },
            { status: 500 },
        );
    }
}
