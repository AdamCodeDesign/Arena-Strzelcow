import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const magazineId = Number(params.id);

        if (isNaN(magazineId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const magazine = await prisma.magazine.findUnique({
            where: { id: magazineId },
            include: {
                gun: true,
            },
        });

        if (!magazine) {
            return NextResponse.json(
                { error: "magazine not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(magazine);
    } catch (error) {
        console.error("Error fetching magazine:", error);
        return NextResponse.json(
            { error: "Failed to fetch magazine" },
            { status: 500 },
        );
    }
}

// PUT - Update magazine by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const magazineId = Number(params.id);
        const body = await request.json();
        const { name, capacity, material, weight } = body;

        // Sprawdzenie, czy ID magazine jest poprawne
        if (isNaN(magazineId)) {
            return NextResponse.json(
                { error: "Invalid magazine ID" },
                { status: 400 },
            );
        }

        // Sprawdzenie, czy magazine istnieje
        const existingMagazine = await prisma.magazine.findUnique({
            where: { id: magazineId },
        });
        if (!existingMagazine) {
            return NextResponse.json(
                { error: "magazine not found" },
                { status: 404 },
            );
        }

        // Aktualizacja magazine
        const updatedMagazine = await prisma.magazine.update({
            where: { id: magazineId },
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

        return NextResponse.json(updatedMagazine, { status: 200 });
    } catch (error) {
        console.error("Error updating magazine:", error);
        return NextResponse.json(
            { error: "Failed to update magazine" },
            { status: 500 },
        );
    }
}

// Delete magazine by ID

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const magazineId = Number(params.id);

        if (isNaN(magazineId)) {
            return NextResponse.json(
                { error: "Invalid magazineId" },
                { status: 400 },
            );
        }

        const magazine = await prisma.magazine.findUnique({
            where: { id: magazineId },
        });

        if (!magazine) {
            return NextResponse.json(
                { error: "I can NOT find magazine" },
                { status: 404 },
            );
        }

        await prisma.magazine.delete({
            where: { id: magazineId },
        });

        return NextResponse.json({ message: "magazine deleted successful" });
    } catch (error) {
        console.log("ERROR: Failed to DELETE magazine", error);
        return NextResponse.json(
            { error: "Failed to DELETE magazine" },
            { status: 500 },
        );
    }
}
