"use client";

import { useState, useRef } from "react";
import { useTournament } from "@/context/TournamentContext";
import type { ViewName } from "@/types";

export default function Navbar() {
  const {
    role,
    myName,
    activeView,
    setActiveView,
    judges,
    addJudge,
    removeJudge,
    votes,
  } = useTournament();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [judgesOpen, setJudgesOpen] = useState(false);
  const [newJudgeName, setNewJudgeName] = useState("");
  const [newJudgePin, setNewJudgePin] = useState("");
  const judgesRef = useRef<HTMLDivElement>(null);

  if (!role) return null;

  const tabs: { id: ViewName; lbl: string }[] =
    role === "admin"
      ? [
          { id: "admin", lbl: "Admin" },
          { id: "judge", lbl: "Głosowanie" },
          { id: "public", lbl: "Ekran" },
          { id: "history", lbl: "Historia" },
          { id: "zawodnicy", lbl: "Zawodnicy" },
        ]
      : [{ id: "judge", lbl: "Głosowanie" }];

  const judgeList = Object.values(judges);

  function handleAddJudge() {
    addJudge(newJudgeName, newJudgePin);
    setNewJudgeName("");
    setNewJudgePin("");
  }

  return (
    <>
      <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-[var(--border)] bg-[rgba(10,10,10,0.92)] px-6 py-2.5 backdrop-blur-[12px]">
        <div className="text-lg font-bold tracking-[4px] text-[var(--gold)]">
          WTG 2026
        </div>

        <div className="flex items-center gap-2.5">
          {/* Desktop tabs */}
          <div className="hidden gap-1 md:flex">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveView(t.id);
                  setDrawerOpen(false);
                }}
                className={`border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[1px] transition-all ${
                  activeView === t.id
                    ? "border-[var(--red)] bg-[var(--red)] text-white"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--fg)] hover:text-[var(--fg)]"
                }`}
              >
                {t.lbl}
              </button>
            ))}
          </div>

          {/* Judges dropdown trigger (admin only) */}
          {role === "admin" && (
            <div className="relative" ref={judgesRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setJudgesOpen(!judgesOpen);
                }}
                className="flex items-center gap-1.5 rounded border border-[var(--border)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--fg)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                <span>&#9878;</span>
                <span className="min-w-[16px] rounded-full bg-[var(--red)] px-1.5 py-0.5 text-center text-[9px] text-white">
                  {judgeList.length}
                </span>
              </button>
            </div>
          )}

          {/* Status badge */}
          <div className="border border-[var(--border)] px-2.5 py-1 font-mono text-[10px] tracking-[2px] text-[var(--muted)]">
            {myName}
          </div>

          {/* Hamburger */}
          <button
            className="flex flex-col gap-[5px] md:hidden"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <span className={`h-[2px] w-5 bg-[var(--fg)] transition-transform ${drawerOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-5 bg-[var(--fg)] transition-opacity ${drawerOpen ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-5 bg-[var(--fg)] transition-transform ${drawerOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-x-0 top-[57px] z-[99] flex flex-col border-b border-[var(--border)] bg-[var(--surface)] md:hidden">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveView(t.id);
                setDrawerOpen(false);
              }}
              className={`border-b border-[var(--border)] px-6 py-3 text-left font-mono text-xs uppercase tracking-[2px] ${
                activeView === t.id ? "bg-[var(--red)] text-white" : "text-[var(--muted)]"
              }`}
            >
              {t.lbl}
            </button>
          ))}
        </div>
      )}

      {/* Judges dropdown panel */}
      {judgesOpen && role === "admin" && (
        <div
          className="fixed right-4 top-14 z-[500] w-[340px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-[var(--border)] px-3.5 py-2.5 font-mono text-[9px] uppercase tracking-[2px] text-[var(--muted)]">
            SĘDZIOWIE
          </div>
          <div className="flex gap-1.5 border-b border-[var(--border)] p-3.5">
            <input
              type="text"
              value={newJudgeName}
              onChange={(e) => setNewJudgeName(e.target.value)}
              placeholder="Imię sędziego..."
              className="flex-1 border border-[var(--border)] bg-[var(--surface2)] px-2 py-1.5 font-mono text-[10px] text-[var(--fg)] outline-none focus:border-[var(--gold)]"
            />
            <input
              type="text"
              value={newJudgePin}
              onChange={(e) => setNewJudgePin(e.target.value)}
              placeholder="PIN"
              maxLength={4}
              inputMode="numeric"
              className="w-16 border border-[var(--border)] bg-[var(--surface2)] px-2 py-1.5 font-mono text-[10px] text-[var(--fg)] outline-none focus:border-[var(--gold)]"
            />
            <button
              onClick={handleAddJudge}
              className="whitespace-nowrap border border-green-600 px-2.5 py-1.5 font-mono text-[9px] text-green-500 transition-colors hover:bg-green-600 hover:text-white"
            >
              DODAJ
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] font-mono text-[9px] uppercase tracking-[1px] text-[var(--muted)]">
                <th className="px-3.5 py-2 text-left">Sędzia</th>
                <th className="px-3.5 py-2 text-left">PIN</th>
                <th className="px-3.5 py-2 text-left">Status</th>
                <th className="px-3.5 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {judgeList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3.5 py-2.5 font-mono text-[10px] text-[var(--muted)]">
                    Brak sędziów
                  </td>
                </tr>
              ) : (
                judgeList.map((j) => {
                  const voted = votes[j.id];
                  return (
                    <tr key={j.id} className="border-b border-[var(--border)]">
                      <td className="px-3.5 py-2 font-mono text-[10px] text-[var(--fg)]">{j.name}</td>
                      <td className="px-3.5 py-2 font-mono text-[10px] tracking-[2px] text-[var(--muted)]">{j.pin}</td>
                      <td className="px-3.5 py-2">
                        <span className="flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${voted ? "bg-green-500" : "bg-[var(--muted)]"}`} />
                          <span className={`font-mono text-[10px] ${voted ? "text-green-500" : "text-[var(--muted)]"}`}>
                            {voted ? "Zagłosował" : "Offline"}
                          </span>
                        </span>
                      </td>
                      <td className="px-3.5 py-2">
                        <button
                          onClick={() => removeJudge(j.id)}
                          className="border border-[var(--border)] px-2 py-1 font-mono text-[9px] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--red)]"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
