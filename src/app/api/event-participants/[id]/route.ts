import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const eventParticipantsId = Number(params.id);

        if (isNaN(eventParticipantsId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const eventParticipants = await prisma.eventParticipants.findUnique({
            where: { id: eventParticipantsId },
            include: {
                user: true,
                event: true,
            },
        });

        if (!eventParticipants) {
            return NextResponse.json(
                { error: "eventParticipants not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(eventParticipants);
    } catch (error) {
        console.error("Error fetching eventParticipants:", error);
        return NextResponse.json(
            { error: "Failed to fetch eventParticipants" },
            { status: 500 },
        );
    }
}

// DELETE - Remove eventParticipants by ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = await params;
        const eventParticipantsId = Number(id);

        if (isNaN(eventParticipantsId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const eventParticipants = await prisma.eventParticipants.findUnique({
            where: { id: eventParticipantsId },
        });

        if (!eventParticipants) {
            return NextResponse.json(
                { error: "eventParticipants not found" },
                { status: 404 },
            );
        }

        await prisma.eventParticipants.delete({
            where: { id: eventParticipantsId },
        });

        return NextResponse.json({
            message: "eventParticipants deleted successfully",
        });
    } catch (error) {
        console.error("ERROR: Failed to delete eventParticipants", error);
        return NextResponse.json(
            { error: "Failed to delete eventParticipants" },
            { status: 500 },
        );
    }
}
