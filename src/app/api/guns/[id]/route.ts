import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const gunId = Number(params.id);

        if (isNaN(gunId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const gun = await prisma.gun.findUnique({
            where: { id: gunId },
            include: {
                silencer: true,
                compensator: true,
                scopes: true,
                grips: true,
                magazine: true,
                competitions: true, // Zwracamy powiązaną konkurencję
            },
        });

        if (!gun) {
            return NextResponse.json(
                { error: "Gun not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(gun);
    } catch (error) {
        console.error("Error fetching gun:", error);
        return NextResponse.json(
            { error: "Failed to fetch gun" },
            { status: 500 },
        );
    }
}

// PUT - Update gun by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const gunId = Number(params.id);
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
            gunScore, // Lista wyników
        } = body;

        // Sprawdzenie, czy ID broni jest poprawne
        if (isNaN(gunId)) {
            return NextResponse.json(
                { error: "Invalid gun ID" },
                { status: 400 },
            );
        }

        // Sprawdzenie, czy broń istnieje
        const existingGun = await prisma.gun.findUnique({
            where: { id: gunId },
        });
        if (!existingGun) {
            return NextResponse.json(
                { error: "Gun not found" },
                { status: 404 },
            );
        }

        // Aktualizacja broni
        const updatedGun = await prisma.gun.update({
            where: { id: gunId },
            data: {
                name: name?.trim(),
                type: type?.trim(),
                caliber: caliber?.trim(),
                manufacturer: manufacturer?.trim(),
                magazineId: magazineId ?? null, // Może być null
                silencerId: silencerId ?? null,
                compensatorId: compensatorId ?? null,
                scopes: scopes
                    ? {
                          connect: scopes.map((scopeId: number) => ({
                              id: scopeId,
                          })),
                      }
                    : undefined,
                grips: grips
                    ? {
                          connect: grips.map((gripId: number) => ({
                              id: gripId,
                          })),
                      }
                    : undefined,
                gunScore: gunScore
                    ? {
                          upsert: gunScore.map(
                              (result: {
                                  id?: number;
                                  score: number;
                                  competitionId: number;
                              }) => ({
                                  where: { id: result.id ?? 0 }, // Jeśli ID istnieje, aktualizuje
                                  update: { score: result.score }, // Aktualizacja wyniku
                                  create: {
                                      score: result.score,
                                      competitionId: result.competitionId,
                                  }, // Tworzenie nowego wyniku
                              }),
                          ),
                      }
                    : undefined,
            },
            include: {
                silencer: true,
                compensator: true,
                scopes: true,
                grips: true,
                magazine: true,
                gunScore: true, // Pobranie wyników
            },
        });

        return NextResponse.json(updatedGun, { status: 200 });
    } catch (error) {
        console.error("Error updating gun:", error);
        return NextResponse.json(
            { error: "Failed to update gun" },
            { status: 500 },
        );
    }
}

// DELETE - Remove Gun by ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = await params;
        const gunId = Number(id);

        if (isNaN(gunId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const gun = await prisma.gun.findUnique({
            where: { id: gunId },
        });

        if (!gun) {
            return NextResponse.json(
                { error: "gun not found" },
                { status: 404 },
            );
        }

        await prisma.gun.delete({
            where: { id: gunId },
        });

        return NextResponse.json({
            message: "Gun deleted successfully",
        });
    } catch (error) {
        console.error("ERROR: Failed to delete Gun", error);
        return NextResponse.json(
            { error: "Failed to delete Gun" },
            { status: 500 },
        );
    }
}
