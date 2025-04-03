import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const compensatorId = Number(params.id);

        if (isNaN(compensatorId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const compensator = await prisma.compensator.findUnique({
            where: { id: compensatorId },
            include: {
                guns: true,
            },
        });

        if (!compensator) {
            return NextResponse.json(
                { error: "compensator not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(compensator);
    } catch (error) {
        console.error("Error fetching compensator:", error);
        return NextResponse.json(
            { error: "Failed to fetch compensator" },
            { status: 500 },
        );
    }
}

// PUT - Update compensator by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const compensatorId = Number(params.id);
        const body = await request.json();
        const { name, type, material } = body;

        // Sprawdzenie, czy ID compensator jest poprawne
        if (isNaN(compensatorId)) {
            return NextResponse.json(
                { error: "Invalid compensator ID" },
                { status: 400 },
            );
        }

        // Sprawdzenie, czy compensator istnieje
        const existingCompensator = await prisma.compensator.findUnique({
            where: { id: compensatorId },
        });
        if (!existingCompensator) {
            return NextResponse.json(
                { error: "compensator not found" },
                { status: 404 },
            );
        }

        // Aktualizacja compensator
        const updatedCompensator = await prisma.compensator.update({
            where: { id: compensatorId },
            data: {
                name,
                type,
                material: material ?? null,
            },
            include: {
                guns: true,
            },
        });

        return NextResponse.json(updatedCompensator, { status: 200 });
    } catch (error) {
        console.error("Error updating compensator:", error);
        return NextResponse.json(
            { error: "Failed to update compensator" },
            { status: 500 },
        );
    }
}

// Delete compensator by ID

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const compensatorId = Number(params.id);

        if (isNaN(compensatorId)) {
            return NextResponse.json(
                { error: "Invalid compensatorId" },
                { status: 400 },
            );
        }

        const compensator = await prisma.compensator.findUnique({
            where: { id: compensatorId },
        });

        if (!compensator) {
            return NextResponse.json(
                { error: "I can NOT find compensator" },
                { status: 404 },
            );
        }

        await prisma.compensator.delete({
            where: { id: compensatorId },
        });

        return NextResponse.json({ message: "compensator deleted successful" });
    } catch (error) {
        console.log("ERROR: Failed to DELETE compensator", error);
        return NextResponse.json(
            { error: "Failed to DELETE compensator" },
            { status: 500 },
        );
    }
}
