import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const eventId = Number(params.id);

        if (isNaN(eventId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: {
                competitions: true,
                participants: true,
                EventParticipants: true,
                Result: true,
            },
        });

        if (!event) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json(
            { error: "Failed to fetch event" },
            { status: 500 },
        );
    }
}

// PUT - Update Event by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const eventId = Number(params.id);

        if (isNaN(eventId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const existingEvent = await prisma.event.findUnique({
            where: { id: eventId },
        });

        if (!existingEvent) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 },
            );
        }

        const {
            name,
            date,
            location,
            description,
            competitions,
            participants,
        } = await request.json();

        const updatedEvent = await prisma.event.update({
            where: { id: eventId },
            data: {
                name,
                date: date ? new Date(date) : undefined,
                location,
                description,
                competitions: competitions
                    ? {
                          connect: competitions.map((compId: number) => ({
                              id: compId,
                          })),
                      }
                    : undefined,
                participants: participants
                    ? {
                          connect: participants.map((userId: number) => ({
                              id: userId,
                          })),
                      }
                    : undefined,
            },
            include: { competitions: true, participants: true },
        });

        return NextResponse.json(updatedEvent);
    } catch (error) {
        console.error("ERROR: Failed to update event", error);
        return NextResponse.json(
            { error: "Failed to update event" },
            { status: 500 },
        );
    }
}

// DELETE - Remove Event by ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const eventId = Number(params.id);

        if (isNaN(eventId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 },
            );
        }

        await prisma.event.delete({
            where: { id: eventId },
        });

        return NextResponse.json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("ERROR: Failed to delete event", error);
        return NextResponse.json(
            { error: "Failed to delete event" },
            { status: 500 },
        );
    }
}
