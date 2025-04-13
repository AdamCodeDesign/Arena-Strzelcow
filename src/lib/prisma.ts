import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("databaseURL", process.env.DATABASE_URL);

export default prisma;
