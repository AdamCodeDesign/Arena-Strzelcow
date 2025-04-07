// src/app/api/clubs/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// creating club (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { clubName, description } = body;

        // Walidacja danych wejściowych
        const missingFields = [];
        if (!clubName) missingFields.push("clubName");
        if (!description) missingFields.push("description");

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: "Missing or invalid fields", fields: missingFields },
                { status: 400 },
            );
        }

        let clubExists = false;

        // Jeśli podano clubName, sprawdź, czy club istnieje
        if (clubName) {
            const existingClub = await prisma.club.findUnique({
                where: { clubName: clubName },
            });

            if (existingClub) {
                clubExists = true;
            }
        }

        if (clubName && clubExists) {
            return NextResponse.json(
                {
                    error: "ClubName already exists. Use unique name for your club",
                },
                { status: 404 },
            );
        }

        const newClub = await prisma.club.create({
            data: {
                clubName: clubName.trim(),
                description,
            },
        });

        return NextResponse.json(newClub, { status: 201 });
    } catch (error) {
        console.error("Error creating club:", error);
        return NextResponse.json(
            { error: "Failed to create club" },
            { status: 500 },
        );
    }
}

// GET All clubs (READ)
export async function GET() {
    try {
        const club = await prisma.club.findMany({
            include: {
                members: true,
                events: true,
            },
        });

        if (club.length === 0) {
            return NextResponse.json(
                { message: "No clubs found" },
                { status: 404 },
            );
        }

        return NextResponse.json(club);
    } catch (error) {
        console.error("ERROR: Unable to get all clubs", error);
        return NextResponse.json(
            { error: "I can not GET ALL clubs" },
            { status: 500 },
        );
    }
}
