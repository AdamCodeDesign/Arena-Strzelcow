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
        const userId = parseInt(id);

        // Logowanie po konwersji
        console.log("Converted userId:", userId);

        // Jeżeli id jest NaN, zwróć błąd
        if (isNaN(userId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const event = await prisma.user.findUnique({
            where: { id: userId }, // Przekazanie poprawnie skonwertowanego id
            include: {
                events: true,
                competitions: true,
                EventParticipants: true,
                CompetitionParticipants: true,
                Result: true,
                AvgResult: true
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
