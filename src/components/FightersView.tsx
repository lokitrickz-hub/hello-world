"use client";

import { useState } from "react";
import { useTournament } from "@/context/TournamentContext";

export default function FightersView() {
  const { zawodnicyList } = useTournament();
  const [search, setSearch] = useState("");

  const query = search.toLowerCase().trim();
  const filtered = zawodnicyList.filter((z) => {
    if (!query) return true;
    return `${z.imie} ${z.nazwisko} ${z.pseudonim} ${z.klub}`
      .toLowerCase()
      .includes(query);
  });

  return (
    <div className="p-4 md:p-8">
      <div className="border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] px-4 py-3 font-[Landasans] text-sm tracking-[2px]">
          Zawodnicy
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj po imieniu, nazwisku, pseudonimie, klubie..."
            className="flex-1 rounded border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 font-mono text-[11px] text-[var(--fg)] outline-none focus:border-[var(--gold)]"
          />
          <span className="whitespace-nowrap font-mono text-[10px] text-[var(--muted)]">
            {filtered.length} / {zawodnicyList.length} zawodników
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-[11px]">
            <thead>
              <tr>
                {["Imię", "Nazwisko", "Pseudonim", "Klub sportowy", "Data urodzenia", "Kategoria"].map(
                  (h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap border-b-2 border-[var(--red)] px-3 py-2.5 text-left text-[9px] uppercase tracking-[1px] text-[var(--muted)]"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-xs text-[var(--muted)]"
                  >
                    {zawodnicyList.length
                      ? `Brak wyników dla "${query}"`
                      : "Brak zarejestrowanych zawodników"}
                  </td>
                </tr>
              ) : (
                filtered.map((z) => (
                  <tr
                    key={z.id}
                    className="border-b border-[var(--border)] transition-colors hover:bg-[var(--surface2)]"
                  >
                    <td className="px-3 py-2.5">{z.imie || "—"}</td>
                    <td className="px-3 py-2.5">{z.nazwisko || "—"}</td>
                    <td className="px-3 py-2.5 font-bold text-[var(--gold)]">
                      {z.pseudonim || "—"}
                    </td>
                    <td className="px-3 py-2.5">{z.klub || "—"}</td>
                    <td className="px-3 py-2.5">{z.dataUrodzenia || "—"}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-block whitespace-nowrap rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] tracking-[1px] text-[var(--muted)]">
                        {z.kategoria || "—"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
