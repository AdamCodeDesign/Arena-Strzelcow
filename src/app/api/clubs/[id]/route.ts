import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get by ID (READ)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const clubId = Number(params.id);

        if (isNaN(clubId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const club = await prisma.club.findUnique({
            where: { id: clubId },
            include: {
                members: true,
                events: true,
            },
        });

        if (!club) {
            return NextResponse.json(
                { error: "club not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(club);
    } catch (error) {
        console.error("Error fetching club:", error);
        return NextResponse.json(
            { error: "Failed to fetch club" },
            { status: 500 },
        );
    }
}

// PUT - Update club by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = await params;
        const clubId = Number(id);

        if (isNaN(clubId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const existingClub = await prisma.club.findUnique({
            where: { id: clubId },
        });

        if (!existingClub) {
            return NextResponse.json(
                { error: "club not found" },
                { status: 404 },
            );
        }

        const { clubName, description } = await request.json();

        let clubExists = false;

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
                    error: "ClubName already exists. Can't update. Use unique name for your club",
                },
                { status: 404 },
            );
        }

        const updatedClub = await prisma.club.update({
            where: { id: clubId },
            data: {
                clubName: clubName.trim(),
                description,
            },
            include: { members: true, events: true },
        });

        return NextResponse.json(updatedClub);
    } catch (error) {
        console.error("ERROR: Failed to update club", error);
        return NextResponse.json(
            { error: "Failed to update club" },
            { status: 500 },
        );
    }
}

// DELETE - Remove club by ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = await params;
        const clubId = Number(id);

        if (isNaN(clubId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const club = await prisma.club.findUnique({
            where: { id: clubId },
        });

        if (!club) {
            return NextResponse.json(
                { error: "club not found" },
                { status: 404 },
            );
        }

        await prisma.club.delete({
            where: { id: clubId },
        });

        return NextResponse.json({
            message: "club deleted successfully",
        });
    } catch (error) {
        console.error("ERROR: Failed to delete club", error);
        return NextResponse.json(
            { error: "Failed to delete club" },
            { status: 500 },
        );
    }
}
