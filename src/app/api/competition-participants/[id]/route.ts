import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const competitionParticipantsId = Number(params.id);

        if (isNaN(competitionParticipantsId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const competitionParticipants =
            await prisma.competitionParticipants.findUnique({
                where: { id: competitionParticipantsId },
                include: {
                    user: true,
                    competition: true,
                },
            });

        if (!competitionParticipants) {
            return NextResponse.json(
                { error: "competitionParticipants not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(competitionParticipants);
    } catch (error) {
        console.error("Error fetching competitionParticipants:", error);
        return NextResponse.json(
            { error: "Failed to fetch competitionParticipants" },
            { status: 500 },
        );
    }
}

// DELETE - Remove competitionParticipants by ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = await params;
        const competitionParticipantsId = Number(id);

        if (isNaN(competitionParticipantsId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const competitionParticipants =
            await prisma.competitionParticipants.findUnique({
                where: { id: competitionParticipantsId },
            });

        if (!competitionParticipants) {
            return NextResponse.json(
                { error: "competitionParticipants not found" },
                { status: 404 },
            );
        }

        await prisma.competitionParticipants.delete({
            where: { id: competitionParticipantsId },
        });

        return NextResponse.json({
            message: "competitionParticipants deleted successfully",
        });
    } catch (error) {
        console.error("ERROR: Failed to delete competitionParticipants", error);
        return NextResponse.json(
            { error: "Failed to delete competitionParticipants" },
            { status: 500 },
        );
    }
}
