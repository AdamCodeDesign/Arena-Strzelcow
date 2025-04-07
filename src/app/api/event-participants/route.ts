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
                { message: "No clubs found" },
                { status: 404 },
            );
        }
        return NextResponse.json(participants);
    } catch (error) {
        console.error("ERROR: Unable to get all participants", error);
        return NextResponse.json(
            { error: "Failed to fetch participants" },
            { status: 500 },
        );
    }
}

// CREATE new
export async function POST(req: Request) {
    try {
        const { userId, eventId } = await req.json();

        const newParticipant = await prisma.eventParticipants.create({
            data: {
                userId,
                eventId,
            },
        });

        return NextResponse.json(newParticipant, { status: 201 });
    } catch (error) {
        console.error("ERROR: Unable to create participants", error);
        return NextResponse.json(
            { error: "Failed to create participant" },
            { status: 500 },
        );
    }
}
