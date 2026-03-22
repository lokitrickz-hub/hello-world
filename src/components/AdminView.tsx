"use client";

import { useTournament } from "@/context/TournamentContext";
import Bracket from "./Bracket";

export default function AdminView() {
  const {
    CATS,
    cats,
    activeCat,
    setActiveCat,
    liveCat,
    startMatch,
    showVerdict,
    loadDemoCat,
  } = useTournament();

  const cat = cats[activeCat];

  return (
    <div className="p-4 md:p-8">
      {/* Category tabs */}
      <div className="mb-6 flex gap-2">
        {CATS.map((name, i) => {
          const done = cats[i].matchResults["3_0"];
          const hasMatches = cats[i].bracket.length > 0;
          return (
            <button
              key={i}
              onClick={() => setActiveCat(i)}
              className={`flex items-center gap-2 border px-5 py-2.5 font-[Landasans] text-sm tracking-[2px] transition-all ${
                i === activeCat
                  ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--fg)] hover:text-[var(--fg)]"
              }`}
            >
              {name}
              <span className="font-mono text-[9px]">
                {done ? "✓" : hasMatches ? "▶" : "—"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bracket panel */}
      <div className="w-full border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex flex-wrap items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <span className="font-[Landasans] text-sm tracking-[2px] text-[var(--fg)]">
            Drabinka —{" "}
            <span className="text-[var(--gold)]">{CATS[activeCat]}</span>
          </span>
          <button
            onClick={loadDemoCat}
            className="ml-auto border border-[var(--border)] px-3.5 py-1.5 font-mono text-[10px] tracking-[1px] text-[var(--muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            ZAŁADUJ DEMO
          </button>
        </div>

        <div className="min-h-[500px] overflow-auto p-4">
          <Bracket
            bracket={cat.bracket}
            matchResults={cat.matchResults}
            currentMatch={cat.currentMatch}
            liveCat={liveCat}
            currentCat={activeCat}
            onStartMatch={(r, m) => startMatch(activeCat, r, m)}
            onVerdict={showVerdict}
            isAdmin
          />
        </div>
      </div>
    </div>
  );
}
