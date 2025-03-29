// src/app/api/events/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// creating event (POST)
export async function POST(request: Request) {
    try {
        const { name, date, location, description } = await request.json();

        // Walidacja danych
        if (!name || !date || !location || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        // Tworzenie wydarzenia w bazie
        const newEvent = await prisma.event.create({
            data: {
                name,
                date: new Date(date), // Przekształcenie daty
                location,
                description,
            },
        });

        return NextResponse.json(newEvent, { status: 201 }); // Zwrócenie nowego wydarzenia
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 },
        );
    }
}

// GET All events (READ)
export async function GET() {
    try {
        const events = await prisma.event.findMany({
            include: {
                competitions: true,
                participants: true,
                EventParticipants: true,
                Result: true,
                AvgResult: true,
            },
        });

        if (events.length === 0) {
            return NextResponse.json(
                { message: "No events found" },
                { status: 404 },
            );
        }

        return NextResponse.json(events);
    } catch (error) {
        console.error("ERROR: Unable to get all events", error); // Użyj console.error
        return NextResponse.json(
            { error: "I can not GET ALL events" },
            { status: 500 },
        );
    }
}
