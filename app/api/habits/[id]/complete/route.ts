import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("TOGGLE HIT:", id);

  const today = new Date();

  try {
    await prisma.habitCompletion.create({
      data: {
        habitId: id,
        date: today,
      },
    });

    return NextResponse.json({ completed: true });
  } catch {
    await prisma.habitCompletion.deleteMany({
      where: {
        habitId: id,
      },
    });

    return NextResponse.json({ completed: false });
  }
}
