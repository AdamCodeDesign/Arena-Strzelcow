import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { verifyJWT } from "@/lib/auth";


// GET a single profile by dynamic id
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const id = Number(params.id);
        const profile = await prisma.profile.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, username: true, email: true } },
                club: true,
            },
        });
        if (!profile) {
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 },
            );
        }
        return NextResponse.json(profile);
    } catch (error) {
        console.error("ERROR fetching profile:", error);
        return NextResponse.json(
            { error: "Server error: fetching profile" },
            { status: 500 },
        );
    }
}

// PATCH (update profile) by dynamic id
export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }
        const token = authHeader.split(" ")[1];
        const user = verifyJWT(token);
        if (!user) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 403 },
            );
        }

        const id = Number(params.id);
        if (user.userId !== id && user.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        const formData = await req.formData();
        const bio = formData.get("bio") as string | null;
        const role = formData.get("role") as "USER" | "ADMIN" | null;
        const clubIdRaw = formData.get("clubId");
        const clubId = clubIdRaw ? Number(clubIdRaw) : null;

        let avatarUrl: string | null = null;
        const file = formData.get("avatar") as File | null;
        if (file && file.size > 0) {
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

        const updated = await prisma.profile.update({
            where: { id },
            data: {
                ...(bio !== null && { bio }),
                ...(avatarUrl !== null && { avatarUrl }),
                ...(role !== null && { role }),
                ...(clubId !== null && { clubId }),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("ERROR updating profile:", error);
        return NextResponse.json(
            { error: "Server error: updating profile" },
            { status: 500 },
        );
    }
}

// DELETE profile by dynamic id
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const id = Number(params.id);
        await prisma.profile.delete({ where: { id } });
        return NextResponse.json({ message: "Profile deleted" });
    } catch (error) {
        console.error("ERROR deleting profile:", error);
        return NextResponse.json(
            { error: "Server error: deleting profile" },
            { status: 500 },
        );
    }
}
