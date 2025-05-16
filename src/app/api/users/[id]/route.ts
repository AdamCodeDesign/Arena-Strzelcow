import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET user by ID
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

// Update User by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        // Pobranie id z params
        const { id } = params;
        console.log("ID from params", id);

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // Pobranie danych z ciała żądania
        const {
            username,
            email,
            password,
            events,
            competitions,
            EventParticipants,
            CompetitionParticipants,
            Result,
        } = await request.json();

        // Weryfikacja, czy podano przynajmniej jedno pole do aktualizacji
        if (
            !username &&
            !email &&
            !password &&
            !events &&
            !competitions &&
            !EventParticipants &&
            !CompetitionParticipants &&
            !Result
        ) {
            return NextResponse.json(
                { error: "At least one field to update is required" },
                { status: 400 },
            );
        }

        let userExists = false;

        if (username || email) {
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ username: username }, { email: email }],
                },
            });

            if (existingUser) {
                userExists = true;
            }
        }

        if (userExists) {
            return NextResponse.json(
                {
                    error: "Username or email already exists. Use unique username or email",
                },
                { status: 404 },
            );
        }

        // Wykonanie aktualizacji użytkownika
        const user = await prisma.user.update({
            where: { id: parseInt(id) }, // Używamy id z params
            data: {
                username,
                email,
                password,
                events: events
                    ? {
                          set: [], // Zerowanie istniejących powiązań
                          connect: events.map((eventId: number) => ({
                              id: eventId,
                          })),
                      }
                    : undefined,
                competitions: competitions
                    ? {
                          set: [], // Zerowanie istniejących powiązań
                          connect: competitions.map(
                              (competitionId: number) => ({
                                  id: competitionId,
                              }),
                          ),
                      }
                    : undefined,
                EventParticipants: EventParticipants
                    ? {
                          set: [],
                          connect: EventParticipants.map(
                              (eventParticipantId: number) => ({
                                  id: eventParticipantId,
                              }),
                          ),
                      }
                    : undefined,
                CompetitionParticipants: CompetitionParticipants
                    ? {
                          set: [],
                          connect: CompetitionParticipants.map(
                              (competitionParticipantId: number) => ({
                                  id: competitionParticipantId,
                              }),
                          ),
                      }
                    : undefined,
                Result: Result
                    ? {
                          set: [],
                          connect: Result.map((resultId: number) => ({
                              id: resultId,
                          })),
                      }
                    : undefined,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log("ERROR: Failed to update user", error);
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 },
        );
    }
}

// Remove User by ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        // Sprawdzamy, czy ID jest przekazane w URL
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: "Missing user ID" },
                { status: 400 },
            );
        }

        // Usuwamy użytkownika na podstawie ID
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) },
        });

        // Jeśli użytkownik został usunięty, zwrócimy status 200
        return NextResponse.json(deletedUser, { status: 200 });
    } catch (error) {
        console.error("ERROR: Failed to delete user", error);
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 },
        );
    }
}
