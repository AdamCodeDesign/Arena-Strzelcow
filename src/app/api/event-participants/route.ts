import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all
export async function GET() {
    try {
        const participants = await prisma.eventParticipants.findMany({
            include: {
                user: true,
                event: true,
            },
        });

        if (participants.length === 0) {
            return NextResponse.json(
                { message: "No event participants found" },
                { status: 404 },
            );
        }
        return NextResponse.json(participants);
    } catch (error) {
        console.error("ERROR: Unable to get all event participants", error);
        return NextResponse.json(
            { error: "Failed to fetch event participants" },
            { status: 500 },
        );
    }
}

// CREATE new
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userId = Number(body.userId);
        const eventId = Number(body.eventId);

        const existingParticipant = await prisma.eventParticipants.findFirst({
            where: { userId, eventId },
        });

        if (existingParticipant) {
            return NextResponse.json(
                { error: "Participant already assigned" },
                { status: 409 },
            );
        }

        const newParticipant = await prisma.eventParticipants.create({
            data: { userId, eventId },
        });

        return NextResponse.json(newParticipant, { status: 201 });
    } catch (error) {
        console.error("ERROR: Unable to create participant", error);
        return NextResponse.json(
            { error: "Failed to create participant" },
            { status: 500 },
        );
    }
}
