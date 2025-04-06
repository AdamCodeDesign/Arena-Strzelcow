import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get result by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const resultId = Number(params.id);

        if (isNaN(resultId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const result = await prisma.result.findUnique({
            where: { id: resultId },
            include: {
                user: true,
                gun: true,
                competition: true,
            },
        });

        if (!result) {
            return NextResponse.json(
                { error: "result not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching result:", error);
        return NextResponse.json(
            { error: "Failed to fetch result" },
            { status: 500 },
        );
    }
}

// PUT - Update result by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const resultId = Number(params.id);
        const body = await request.json();
        const { score, userId, gunId, competitionId } = body;

        if (isNaN(resultId)) {
            return NextResponse.json(
                { error: "Invalid result ID" },
                { status: 400 },
            );
        }

        const existingResult = await prisma.result.findUnique({
            where: { id: resultId },
        });
        if (!existingResult) {
            return NextResponse.json(
                { error: "result not found" },
                { status: 404 },
            );
        }

        const updatedResult = await prisma.result.update({
            where: { id: resultId },
            data: {
                score: Number(score),
                userId: Number(userId),
                gunId: Number(gunId),
                competitionId: Number(competitionId),
            },
        });

        return NextResponse.json(updatedResult, { status: 200 });
    } catch (error) {
        console.error("Error updating result:", error);
        return NextResponse.json(
            { error: "Failed to update result" },
            { status: 500 },
        );
    }
}

// Delete result by ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const resultId = Number(params.id);

        if (isNaN(resultId)) {
            return NextResponse.json(
                { error: "Invalid resultId" },
                { status: 400 },
            );
        }

        const result = await prisma.result.findUnique({
            where: { id: resultId },
        });

        if (!result) {
            return NextResponse.json(
                { error: "I can NOT find result" },
                { status: 404 },
            );
        }

        await prisma.result.delete({
            where: { id: resultId },
        });

        return NextResponse.json({ message: "result deleted successful" });
    } catch (error) {
        console.log("ERROR: Failed to DELETE result", error);
        return NextResponse.json(
            { error: "Failed to DELETE result" },
            { status: 500 },
        );
    }
}
