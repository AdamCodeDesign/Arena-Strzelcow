import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// creating gun (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, type, magnification, lensDiameter, length, weight } =
            body;

        // Walidacja danych wejściowych
        const missingFields = [];
        if (!name) missingFields.push("name");
        if (!type) missingFields.push("type");

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: "Missing or invalid fields", fields: missingFields },
                { status: 400 },
            );
        }

        // Tworzenie scope
        const newScope = await prisma.scope.create({
            data: {
                name,
                type,
                magnification: Number(magnification),
                lensDiameter: Number(lensDiameter),
                length: Number(length),
                weight: Number(weight),
            },
            include: {
                guns: true,
            },
        });

        return NextResponse.json(newScope, { status: 201 }); // Zwracamy nową broń
    } catch (error) {
        console.error("Error creating scope:", error);
        return NextResponse.json(
            { error: "Failed to create scope" },
            { status: 500 },
        );
    }
}

// GET All competitions (READ)
export async function GET() {
    try {
        const scopes = await prisma.scope.findMany({
            include: {
                guns: true,
            },
        });

        if (scopes.length === 0) {
            return NextResponse.json(
                { message: "No guns found" },
                { status: 404 },
            );
        }

        return NextResponse.json(scopes);
    } catch (error) {
        console.error("ERROR: Unable to get all scopes", error); // Użyj console.error
        return NextResponse.json(
            { error: "I can not GET ALL scopes" },
            { status: 500 },
        );
    }
}
