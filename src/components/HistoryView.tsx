"use client";

import { useState } from "react";
import { useTournament } from "@/context/TournamentContext";
import Bracket from "./Bracket";

export default function HistoryView() {
  const { CATS, cats } = useTournament();
  const [openArchives, setOpenArchives] = useState<Record<string, boolean>>({});

  function toggleArchive(key: string) {
    setOpenArchives((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="p-4 md:p-8">
      {CATS.map((catName, ci) => {
        const cat = cats[ci];
        const champ = cat.matchResults["3_0"]?.winner;

        return (
          <div key={ci} className="mb-9">
            {/* Category header */}
            <div className="mb-4 flex items-center gap-3 border-b-2 border-[var(--red)] py-3.5 font-[Landasans] text-[22px] tracking-[3px]">
              {catName}
              {champ && (
                <span className="border border-[var(--gold)] bg-[var(--gold)]/15 px-3 py-1 font-mono text-sm tracking-[1px] text-[var(--gold)]">
                  🏆 {champ.name}
                </span>
              )}
            </div>

            {/* Current bracket */}
            {!cat.bracket.length ? (
              <div className="border border-dashed border-[var(--border)] p-6 text-center font-mono text-[11px] text-[var(--muted)]">
                Brak aktywnej drabinki dla kategorii {catName}
              </div>
            ) : (
              <Bracket
                bracket={cat.bracket}
                matchResults={cat.matchResults}
              />
            )}

            {/* Archived brackets */}
            {(cat.history || [])
              .slice()
              .reverse()
              .map((entry, ei) => {
                const archIdx = (cat.history?.length || 0) - 1 - ei;
                const key = `${ci}_${archIdx}`;
                const isOpen = openArchives[key];

                return (
                  <div key={key} className="mt-4">
                    <button
                      onClick={() => toggleArchive(key)}
                      className="flex w-full items-center gap-2.5 border border-[var(--border)] bg-[var(--surface2)] px-3.5 py-2.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--fg)]"
                    >
                      <span>Archiwum #{archIdx + 1} — {entry.date}</span>
                      {entry.champion && (
                        <span className="border border-[var(--gold)] bg-[var(--gold)]/15 px-3 py-0.5 font-mono text-sm text-[var(--gold)]">
                          🏆 {entry.champion}
                        </span>
                      )}
                      <span className="ml-auto text-[10px]">
                        {isOpen ? "▼" : "▶"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="overflow-x-auto pt-3">
                        <Bracket
                          bracket={entry.bracket}
                          matchResults={entry.matchResults}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
