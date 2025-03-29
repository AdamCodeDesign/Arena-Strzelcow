import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = params;

        // Logowanie przekazywanego ID
        console.log("Received ID:", id);

        // Konwertowanie id na liczbę całkowitą
        const eventId = parseInt(id);

        // Logowanie po konwersji
        console.log("Converted eventId:", eventId);

        // Jeżeli id jest NaN, zwróć błąd
        if (isNaN(eventId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const event = await prisma.event.findUnique({
            where: { id: eventId }, // Przekazanie poprawnie skonwertowanego id
            include: {
                competitions: true,
                participants: true,
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

// PUT - Update Event
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = params; // Poprawnie pobieramy ID

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
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
            where: { id: Number(id) },
            data: {
                name,
                date: date ? new Date(date) : undefined,
                location,
                description,
                competitions: competitions
                    ? {
                          set: [],
                          connect: competitions.map((compId: number) => ({
                              id: compId,
                          })),
                      }
                    : undefined,
                participants: participants
                    ? {
                          set: [],
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

// DELETE - Remove Event
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const eventId = parseInt(params.id);
        if (isNaN(eventId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
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
