// src/app/api/events/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// creating competition (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, type,description, distance, position, scope, eventId } = body;

        // Walidacja danych wejściowych
        const missingFields = [];
        if (!name) missingFields.push("name");
        if (!type) missingFields.push("type");
        if (!distance || isNaN(Number(distance)))
            missingFields.push("distance (must be a number)");
        if (!position) missingFields.push("position");
        if (!scope || isNaN(Number(scope)))
            missingFields.push("scope (must be a number)");

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: "Missing or invalid fields", fields: missingFields },
                { status: 400 },
            );
        }

        let eventExists = true;

        // Jeśli podano eventId, sprawdź, czy event istnieje
        if (eventId) {
            const existingEvent = await prisma.event.findUnique({
                where: { id: Number(eventId) },
            });

            if (!existingEvent) {
                eventExists = false;
            }
        }

        if (eventId && !eventExists) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 },
            );
        }

        // Tworzenie konkurencji
        const newCompetition = await prisma.competition.create({
            data: {
                name: name.trim(),
                type: type.trim(),
                description,
                distance: Number(distance),
                position: position.trim(),
                scope: Number(scope),
                eventId: eventId ? Number(eventId) : null, // Może być null
            },
        });

        return NextResponse.json(newCompetition, { status: 201 });
    } catch (error) {
        console.error("Error creating competition:", error);
        return NextResponse.json(
            { error: "Failed to create competition" },
            { status: 500 },
        );
    }
}

// GET All competitions (READ)
export async function GET() {
    try {
        const competition = await prisma.competition.findMany({
            include: {
                event: true,
                participants: true,
            },
        });

        if (competition.length === 0) {
            return NextResponse.json(
                { message: "No events found" },
                { status: 404 },
            );
        }

        return NextResponse.json(competition);
    } catch (error) {
        console.error("ERROR: Unable to get all events", error); // Użyj console.error
        return NextResponse.json(
            { error: "I can not GET ALL events" },
            { status: 500 },
        );
    }
}
