import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const silencerId = Number(params.id);

        if (isNaN(silencerId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const silencer = await prisma.silencer.findUnique({
            where: { id: silencerId },
            include: {
                guns: true,
            },
        });

        if (!silencer) {
            return NextResponse.json(
                { error: "silencer not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(silencer);
    } catch (error) {
        console.error("Error fetching silencer:", error);
        return NextResponse.json(
            { error: "Failed to fetch silencer" },
            { status: 500 },
        );
    }
}

// PUT - Update silencer by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const silencerId = Number(params.id);
        const body = await request.json();
        const { name } = body;

        // Sprawdzenie, czy ID silencer jest poprawne
        if (isNaN(silencerId)) {
            return NextResponse.json(
                { error: "Invalid silencer ID" },
                { status: 400 },
            );
        }

        // Sprawdzenie, czy silencer istnieje
        const existingSilencer = await prisma.silencer.findUnique({
            where: { id: silencerId },
        });
        if (!existingSilencer) {
            return NextResponse.json(
                { error: "silencer not found" },
                { status: 404 },
            );
        }

        // Aktualizacja silencer
        const updatedSilencer = await prisma.silencer.update({
            where: { id: silencerId },
            data: {
                name,
            },
            include: {
                guns: true,
            },
        });

        return NextResponse.json(updatedSilencer, { status: 200 });
    } catch (error) {
        console.error("Error updating silencer:", error);
        return NextResponse.json(
            { error: "Failed to update silencer" },
            { status: 500 },
        );
    }
}

// Delete silencer by ID

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const silencerId = Number(params.id);

        if (isNaN(silencerId)) {
            return NextResponse.json(
                { error: "Invalid silencerId" },
                { status: 400 },
            );
        }

        const silencer = await prisma.silencer.findUnique({
            where: { id: silencerId },
        });

        if (!silencer) {
            return NextResponse.json(
                { error: "I can NOT find silencer" },
                { status: 404 },
            );
        }

        await prisma.silencer.delete({
            where: { id: silencerId },
        });

        return NextResponse.json({ message: "silencer deleted successful" });
    } catch (error) {
        console.log("ERROR: Failed to DELETE silencer", error);
        return NextResponse.json(
            { error: "Failed to DELETE silencer" },
            { status: 500 },
        );
    }
}
