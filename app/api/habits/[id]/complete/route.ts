import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const habitId = params.id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    await prisma.habitCompletion.create({
      data: {
        habitId,
        date: today,
      },
    });

    return NextResponse.json({ completed: true });
  } catch {
    // Si ya existe, lo borramos (toggle)
    await prisma.habitCompletion.deleteMany({
      where: {
        habitId,
        date: today,
      },
    });

    return NextResponse.json({ completed: false });
  }
}
