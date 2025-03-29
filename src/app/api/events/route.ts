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

// getting all events
export async function GET() {
    try {
        const event = await prisma.event.findMany();

        return NextResponse.json(event);
    } catch (error) {
        console.log("ERROR: I can not GET ALL events", error);
        return NextResponse.json(
            { error: "I can not GET ALL events" },
            { status: 500 },
        );
    }
}
