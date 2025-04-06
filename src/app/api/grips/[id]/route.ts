import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const gripId = Number(params.id);

        if (isNaN(gripId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const grip = await prisma.grip.findUnique({
            where: { id: gripId },
            include: {
                gun: true,
            },
        });

        if (!grip) {
            return NextResponse.json(
                { error: "grip not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(grip);
    } catch (error) {
        console.error("Error fetching grip:", error);
        return NextResponse.json(
            { error: "Failed to fetch grip" },
            { status: 500 },
        );
    }
}

// PUT - Update grip by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const gripId = Number(params.id);
        const body = await request.json();
        const { name, type, material, weight } = body;

        // Sprawdzenie, czy ID grip jest poprawne
        if (isNaN(gripId)) {
            return NextResponse.json(
                { error: "Invalid grip ID" },
                { status: 400 },
            );
        }

        // Sprawdzenie, czy grip istnieje
        const existingGrip = await prisma.grip.findUnique({
            where: { id: gripId },
        });
        if (!existingGrip) {
            return NextResponse.json(
                { error: "grip not found" },
                { status: 404 },
            );
        }

        // Aktualizacja grip
        const updatedGrip = await prisma.grip.update({
            where: { id: gripId },
            data: {
                name,
                type,
                material: material ?? null,
                weight,
            },
            include: {
                gun: true,
            },
        });

        return NextResponse.json(updatedGrip, { status: 200 });
    } catch (error) {
        console.error("Error updating grip:", error);
        return NextResponse.json(
            { error: "Failed to update grip" },
            { status: 500 },
        );
    }
}

// Delete grip by ID

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const gripId = Number(params.id);

        if (isNaN(gripId)) {
            return NextResponse.json(
                { error: "Invalid gripId" },
                { status: 400 },
            );
        }

        const grip = await prisma.grip.findUnique({
            where: { id: gripId },
        });

        if (!grip) {
            return NextResponse.json(
                { error: "I can NOT find grip" },
                { status: 404 },
            );
        }

        await prisma.grip.delete({
            where: { id: gripId },
        });

        return NextResponse.json({ message: "grip deleted successful" });
    } catch (error) {
        console.log("ERROR: Failed to DELETE grip", error);
        return NextResponse.json(
            { error: "Failed to DELETE grip" },
            { status: 500 },
        );
    }
}
