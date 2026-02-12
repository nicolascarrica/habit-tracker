"use client";

import { createHabit, deleteHabit, fetchHabits, toggleHabitCompletion } from "@/services/habits";
import { useEffect, useState } from "react";

type Habit = {
  id: string;
  name: string;
  emoji: string;
  completions: {
    id: string;
    date: string;
  }[];
};

const EMOJIS = ["💪", "📚", "🧘", "💧", "🏃", "🛌", "🥗", "🧠"];

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("💪");

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    const data = await fetchHabits();
    setHabits(data);
  }

  async function handleCreateHabit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;

    await createHabit(name, selectedEmoji);
    setName("");
    loadHabits();
  }


  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Habit Tracker
        </h1>

        {/* FORM */}
        <form onSubmit={handleCreateHabit} className="space-y-5 mb-10">
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
          {habits.map((habit) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const completedToday = habit.completions?.some((c) => {
              const completionDate = new Date(c.date);
              const now = new Date();
                        
              return (
                completionDate.getFullYear() === now.getFullYear() &&
                completionDate.getMonth() === now.getMonth() &&
                completionDate.getDate() === now.getDate()
              );
            });
            return (
              <div
                key={habit.id}
                className="bg-zinc-800 p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{habit.emoji}</span>

                  <span
                    className={`text-lg ${
                      completedToday ? "line-through text-zinc-500" : ""
                    }`}
                  >
                    {habit.name}
                  </span>
                </div>
                  
                <div className="flex items-center gap-3">
                  <button
                    onClick={async () => {
                      await toggleHabitCompletion(habit.id);
                      loadHabits();
                    }}
                    className={`px-3 py-1 rounded-lg text-sm transition 
                      ${
                        completedToday
                          ? "bg-green-600 text-white"
                          : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                      }`}
                  >
                    {completedToday ? "✔" : "Mark"}
                  </button>
                    
                  <button
                    onClick={async () => {
                      await deleteHabit(habit.id);
                      loadHabits();
                    }}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
