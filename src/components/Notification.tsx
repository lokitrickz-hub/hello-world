"use client";

import { useTournament } from "@/context/TournamentContext";

export default function Notification() {
  const { notification } = useTournament();

  return (
    <div
      className={`fixed bottom-5 right-5 z-[999] border border-[var(--gold)] bg-[var(--surface)] px-4.5 py-2.5 font-mono text-[10px] tracking-[1px] text-[var(--gold)] transition-transform duration-300 ${
        notification ? "translate-y-0" : "translate-y-[100px]"
      }`}
    >
      {notification}
    </div>
  );
}
