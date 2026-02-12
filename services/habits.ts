export async function fetchHabits() {
  const res = await fetch("/api/habits");
  if (!res.ok) throw new Error("Failed to fetch habits");
  return res.json();
}

export async function createHabit(name: string, emoji: string) {
  const res = await fetch("/api/habits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      emoji,
      userId: "Nico",
    }),
  });

  if (!res.ok) throw new Error("Failed to create habit");
  return res.json();
}

export async function deleteHabit(id: string) {
  const res = await fetch("/api/habits", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) throw new Error("Failed to delete habit");
  return res.json();
}

export async function toggleHabitCompletion(habitId: string) {
  const res = await fetch(`/api/habits/${habitId}/complete`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to toggle completion");
  }

  return res.json();
}
