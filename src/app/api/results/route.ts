import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create result by POST
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { score, userId, gunId, competitionId } = body;

        const missingFields = [];
        if (isNaN(score) || Number(score) < 0 || Number(score) > 10.9)
            missingFields.push("wrong score");
        if (!userId) missingFields.push("userId");
        if (!gunId) missingFields.push("gunId");
        if (!competitionId) missingFields.push("competitionId");

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: "Missing required fields", fields: missingFields },
                { status: 400 },
            );
        }

        const newResult = await prisma.result.create({
            data: {
                score: Number(
                    typeof score === "string" ? score.replace(",", ".") : score,
                ),
                user: { connect: { id: userId } },
                gun: { connect: { id: gunId } },
                competition: { connect: { id: competitionId } },
            },
        });

        return NextResponse.json(newResult, { status: 201 });
    } catch (error) {
        console.error("Error creating result:", error);
        return NextResponse.json(
            { error: "Failed to create result" },
            { status: 500 },
        );
    }
}

// GET ALL results by ID
export async function GET() {
    try {
        const results = await prisma.result.findMany({
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
                gun: true,
                competition: true,
            },
        });

        if (results.length === 0) {
            return NextResponse.json(
                { message: "No results found" },
                { status: 404 },
            );
        }

        return NextResponse.json(results);
    } catch (error) {
        console.error("ERROR: Unable to get all results", error);
        return NextResponse.json(
            { error: "I can not GET ALL results" },
            { status: 500 },
        );
    }
}
