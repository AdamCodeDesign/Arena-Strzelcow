import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const competitionId = Number(params.id);

        if (isNaN(competitionId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const competition = await prisma.competition.findUnique({
            where: { id: competitionId },
            include: {
                event: true,
                participants: true,
            },
        });

        if (!competition) {
            return NextResponse.json(
                { error: "competition not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(competition);
    } catch (error) {
        console.error("Error fetching competition:", error);
        return NextResponse.json(
            { error: "Failed to fetch competition" },
            { status: 500 },
        );
    }
}

// PUT - Update competition by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = await params;
        const competitionId = Number(id);

        if (isNaN(competitionId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const existingCompetition = await prisma.competition.findUnique({
            where: { id: competitionId },
        });

        if (!existingCompetition) {
            return NextResponse.json(
                { error: "competition not found" },
                { status: 404 },
            );
        }

        const { name, type, distance, position, scope, eventId } =
            await request.json();

        const updatedcompetition = await prisma.competition.update({
            where: { id: competitionId },
            data: {
                name: name.trim(),
                type: type.trim(),
                distance: Number(distance),
                position: position.trim(),
                scope: Number(scope),
                eventId: eventId ? Number(eventId) : null, // Może być null
            },
            include: { participants: true, CompetitionParticipants: true },
        });

        return NextResponse.json(updatedcompetition);
    } catch (error) {
        console.error("ERROR: Failed to update competition", error);
        return NextResponse.json(
            { error: "Failed to update competition" },
            { status: 500 },
        );
    }
}

// DELETE - Remove competition by ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = await params;
        const competitionId = Number(id);

        if (isNaN(competitionId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const competition = await prisma.competition.findUnique({
            where: { id: competitionId },
        });

        if (!competition) {
            return NextResponse.json(
                { error: "competition not found" },
                { status: 404 },
            );
        }

        await prisma.competition.delete({
            where: { id: competitionId },
        });

        return NextResponse.json({
            message: "competition deleted successfully",
        });
    } catch (error) {
        console.error("ERROR: Failed to delete competition", error);
        return NextResponse.json(
            { error: "Failed to delete competition" },
            { status: 500 },
        );
    }
}
