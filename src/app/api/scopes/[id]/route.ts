import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const scopeId = Number(params.id);

        if (isNaN(scopeId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const scope = await prisma.scope.findUnique({
            where: { id: scopeId },
            include: {
                guns: true,
            },
        });

        if (!scope) {
            return NextResponse.json(
                { error: "Scope not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(scope);
    } catch (error) {
        console.error("Error fetching scope:", error);
        return NextResponse.json(
            { error: "Failed to fetch scope" },
            { status: 500 },
        );
    }
}

// PUT - Update gun by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const scopeId = Number(params.id);
        const body = await request.json();
        const { name, type, magnification, lensDiameter, length, weight } =
            body;

        // Sprawdzenie, czy ID scope jest poprawne
        if (isNaN(scopeId)) {
            return NextResponse.json(
                { error: "Invalid scope ID" },
                { status: 400 },
            );
        }

        // Sprawdzenie, czy scope istnieje
        const existingScope = await prisma.scope.findUnique({
            where: { id: scopeId },
        });
        if (!existingScope) {
            return NextResponse.json(
                { error: "Scope not found" },
                { status: 404 },
            );
        }

        // Aktualizacja scope
        const updatedScope = await prisma.scope.update({
            where: { id: scopeId },
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

        return NextResponse.json(updatedScope, { status: 200 });
    } catch (error) {
        console.error("Error updating scope:", error);
        return NextResponse.json(
            { error: "Failed to update scope" },
            { status: 500 },
        );
    }
}

// Delete scope by ID

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const scopeId = Number(params.id);

        if (isNaN(scopeId)) {
            return NextResponse.json(
                { error: "Invalid scopeId" },
                { status: 400 },
            );
        }

        const scope = await prisma.scope.findUnique({
            where: { id: scopeId },
        });

        if (!scope) {
            return NextResponse.json(
                { error: "I can NOT find scope" },
                { status: 404 },
            );
        }

        await prisma.scope.delete({
            where: { id: scopeId },
        });

        return NextResponse.json({ message: "Scope deleted successful" });
    } catch (error) {
        console.log("ERROR: Failed to DELETE scope", error);
        return NextResponse.json(
            { error: "Failed to DELETE scope" },
            { status: 500 },
        );
    }
}
