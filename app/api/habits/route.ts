import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, emoji, userId } = body;

  if (!name || !emoji || !userId) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const habit = await prisma.habit.create({
    data: {
      name,
      emoji,
      userId,
    },
  });

  return NextResponse.json(habit);
}


export async function GET() {
  const habits = await prisma.habit.findMany({
    include: {
      completions: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(habits);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.habit.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}