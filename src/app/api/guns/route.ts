import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// creating gun (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            type,
            caliber,
            manufacturer,
            magazineId,
            silencerId,
            compensatorId,
            scopes,
            grips,
            competitionId,
        } = body;

        // Walidacja danych wejściowych
        const missingFields = [];
        if (!name) missingFields.push("name");
        if (!type) missingFields.push("type");
        if (!caliber) missingFields.push("caliber");
        if (!manufacturer) missingFields.push("manufacturer");

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: "Missing or invalid fields", fields: missingFields },
                { status: 400 },
            );
        }

        let competitionExists = true;

        // Jeśli podano competitionId, sprawdź, czy event istnieje
        if (competitionId) {
            const existingCompetition = await prisma.competition.findUnique({
                where: { id: Number(competitionId) },
            });

            if (!existingCompetition) {
                competitionExists = false;
            }
        }

        if (competitionId && !competitionExists) {
            return NextResponse.json(
                { error: "Competition not found" },
                { status: 404 },
            );
        }

        // Tworzenie konkurencji
        const newGun = await prisma.gun.create({
            data: {
                name,
                type,
                caliber,
                manufacturer,
                magazineId: magazineId || null,
                silencerId: silencerId || null, // Tłumik jest opcjonalny
                compensatorId: compensatorId || null, // Kompensator jest opcjonalny
                scopes: scopes
                    ? {
                          connect: scopes.map((scopeId: number) => ({
                              id: scopeId,
                          })),
                      } // Łączenie z celownikami
                    : undefined,
                grips: grips
                    ? {
                          connect: grips.map((gripId: number) => ({
                              id: gripId,
                          })),
                      } // Łączenie z celownikami
                    : undefined,
                competitions: {
                    connect: { id: competitionId }, // Przypisanie broni do konkurencji
                },
            },
            include: {
                silencer: true,
                compensator: true,
                scopes: true,
                grips: true,
                magazine: true,
                competitions: true, // Zwracamy powiązaną konkurencję
            },
        });

        return NextResponse.json(newGun, { status: 201 }); // Zwracamy nową broń
    } catch (error) {
        console.error("Error creating gun:", error);
        return NextResponse.json(
            { error: "Failed to create gun" },
            { status: 500 },
        );
    }
}

// GET All competitions (READ)
export async function GET() {
    try {
        const guns = await prisma.gun.findMany({
            include: {
                silencer: true,
                compensator: true,
                scopes: true,
                grips: true,
                magazine: true,
                competitions: true, // Zwracamy powiązaną konkurencję
            },
        });

        if (guns.length === 0) {
            return NextResponse.json(
                { message: "No guns found" },
                { status: 404 },
            );
        }

        return NextResponse.json(guns);
    } catch (error) {
        console.error("ERROR: Unable to get all guns", error); // Użyj console.error
        return NextResponse.json(
            { error: "I can not GET ALL guns" },
            { status: 500 },
        );
    }
}
