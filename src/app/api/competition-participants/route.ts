import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all
export async function GET() {
    try {
        const participants = await prisma.competitionParticipants.findMany({
            include: {
                user: true,
                competition: true,
            },
        });

        if (participants.length === 0) {
            return NextResponse.json(
                { message: "No competition participants found" },
                { status: 404 },
            );
        }
        return NextResponse.json(participants);
    } catch (error) {
        console.error("ERROR: Unable to get all competition participants", error);
        return NextResponse.json(
            { error: "Failed to fetch competition participants" },
            { status: 500 },
        );
    }
}

// CREATE new
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userId = Number(body.userId);
        const competitionId = Number(body.competitionId);

        const existingParticipant = await prisma.competitionParticipants.findFirst({
            where: { userId, competitionId },
        });

        if (existingParticipant) {
            return NextResponse.json(
                { error: "Participant already assigned" },
                { status: 409 },
            );
        }

        const newParticipant = await prisma.competitionParticipants.create({
            data: { userId, competitionId },
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
