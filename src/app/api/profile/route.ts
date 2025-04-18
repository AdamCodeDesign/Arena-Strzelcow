import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Limit: 2MB
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const userId = Number(formData.get("userId"));
        const bio = formData.get("bio") as string | null;

        // Walidacja userId
        if (!userId) {
            return NextResponse.json(
                { error: "Missing userId" },
                { status: 400 },
            );
        }

        let avatarUrl: string | null = null;
        const file = formData.get("avatar") as File | null;

        if (file && file.size > 0) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                return NextResponse.json(
                    {
                        error: "Unsupported file type. Allowed: jpeg, png, webp",
                    },
                    { status: 400 },
                );
            }

            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: "File too large. Max size is 2MB" },
                    { status: 400 },
                );
            }

            const extension = file.name.split(".").pop();
            const fileName = `${uuidv4()}.${extension}`;
            const filePath = path.join(
                process.cwd(),
                "public",
                "avatars",
                fileName,
            );

            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(filePath, buffer);

            avatarUrl = `/avatars/${fileName}`;
        }

        const profile = await prisma.profile.create({
            data: {
                userId,
                bio,
                avatarUrl, // może być null
            },
        });

        return NextResponse.json(profile, { status: 201 });
    } catch (error) {
        console.error("ERROR creating profile:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
