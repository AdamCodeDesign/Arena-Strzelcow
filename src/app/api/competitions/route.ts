// src/app/api/competitions/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const {
            name,
            type,
            eventId, // ID wydarzenia, do którego konkurencja zostanie przypisana
        } = await request.json();

        // Walidacja danych
        if (!name || !type || !eventId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        // Tworzenie konkurencji i przypisanie do wydarzenia
        const newCompetition = await prisma.competition.create({
            data: {
                name,
                type,
                event: {
                    connect: { id: eventId }, // Przypisanie konkurencji do wydarzenia przez connect
                },
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
