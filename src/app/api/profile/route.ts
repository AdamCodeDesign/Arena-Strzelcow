// app/api/profile/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// 2MB limit
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const userId = formData.get("userId");
        const bio = formData.get("bio")?.toString() || "";
        const file = formData.get("avatar") as File;

        if (!userId || !file) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        // Validate file
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type" },
                { status: 400 },
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: "File too large (max 2MB)" },
                { status: 400 },
            );
        }

        // Save file
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${uuidv4()}-${file.name}`;
        const filePath = path.join(
            process.cwd(),
            "public",
            "avatars",
            fileName,
        );
        await writeFile(filePath, buffer);

        const newProfile = await prisma.profile.create({
            data: {
                userId: Number(userId),
                bio,
                avatarUrl: `/avatars/${fileName}`,
            },
        });

        return NextResponse.json(newProfile, { status: 201 });
    } catch (error) {
        console.error("Error creating profile:", error);
        return NextResponse.json(
            { error: "Failed to create profile" },
            { status: 500 },
        );
    }
}
