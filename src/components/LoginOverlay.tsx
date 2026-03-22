"use client";

import { useState } from "react";
import { useTournament } from "@/context/TournamentContext";

export default function LoginOverlay() {
  const { role, login, demoMode } = useTournament();
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (role) return null;

  function handleLogin() {
    if (!name.trim() || !pin.trim()) {
      setError("Wypełnij imię i PIN");
      return;
    }
    const ok = login(name.trim(), pin.trim());
    if (!ok) setError("Nieprawidłowe dane");
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--bg)]/95 backdrop-blur-md">
      <div className="w-[340px] border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <div className="mb-6 text-2xl font-bold tracking-[6px] text-[var(--gold)]">
          WTG 2026
        </div>
        <div className="mb-6 font-mono text-xs tracking-[3px] text-[var(--muted)] uppercase">
          ZALOGUJ SIĘ
        </div>

        {error && (
          <div className="mb-4 border border-[var(--red)] bg-[var(--red)]/10 p-2 font-mono text-xs text-[var(--red)]">
            {error}
          </div>
        )}

        <div className="mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Imię / pseudonim..."
            className="w-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 font-mono text-xs text-[var(--fg)] outline-none focus:border-[var(--gold)]"
            autoComplete="off"
          />
        </div>

        <div className="mb-1 font-mono text-[9px] tracking-[1px] text-[var(--muted)]">
          PIN (4 cyfry)
        </div>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="••••"
          maxLength={4}
          inputMode="numeric"
          className="mb-4 w-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-center font-mono text-lg tracking-[8px] text-[var(--fg)] outline-none focus:border-[var(--gold)]"
        />

        <button
          onClick={handleLogin}
          className="mb-3 w-full border border-[var(--border)] bg-transparent px-4 py-3 font-[Landasans] text-sm tracking-[3px] text-[var(--fg)] transition-colors hover:border-[var(--fg)] hover:text-white"
        >
          ZALOGUJ
        </button>

        <button
          onClick={demoMode}
          className="w-full border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 font-mono text-xs tracking-[1px] text-[var(--muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
        >
          TRYB DEMO
        </button>
      </div>
    </div>
  );
}
