"use client";

import { useEffect, useState } from "react";

type Habit = {
  id: string;
  name: string;
  emoji: string;
};

const EMOJIS = ["💪", "📚", "🧘", "💧", "🏃", "🛌", "🥗", "🧠"];

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("💪");

  async function fetchHabits() {
    const res = await fetch("/api/habits");
    const data = await res.json();
    setHabits(data);
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  async function createHabit(e: React.FormEvent) {
    e.preventDefault();

    if (!name) return;

    await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        emoji: selectedEmoji,
        userId: "nico",
      }),
    });

    setName("");
    fetchHabits();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Habit Tracker
        </h1>

        {/* FORM */}
        <form onSubmit={createHabit} className="space-y-5 mb-10">
          <input
            type="text"
            placeholder="What habit do you want to build?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />

          {/* EMOJI PICKER */}
          <div className="flex gap-3 flex-wrap">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                className={`text-2xl p-2 rounded-lg transition ${
                  selectedEmoji === emoji
                    ? "bg-white text-black"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:opacity-80 transition"
          >
            Add Habit
          </button>
        </form>

        {/* HABITS LIST */}
        <div className="space-y-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="bg-zinc-800 p-4 rounded-lg flex items-center gap-4"
            >
              <span className="text-2xl">{habit.emoji}</span>
              <span className="text-lg">{habit.name}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
