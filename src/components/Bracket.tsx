"use client";

import type { Match, MatchResult } from "@/types";

const ROUND_LABELS = ["Eliminacje", "Ćwierćfinał", "Półfinał", "Finał"];

interface BracketProps {
  bracket: Match[][];
  matchResults: Record<string, MatchResult>;
  liveCat?: number;
  currentCat?: number;
  currentMatch?: { round: number; match: number } | null;
  onStartMatch?: (round: number, matchIdx: number) => void;
  onVerdict?: () => void;
  isAdmin?: boolean;
}

export default function Bracket({
  bracket,
  matchResults,
  currentMatch,
  liveCat,
  currentCat,
  onStartMatch,
  onVerdict,
  isAdmin = false,
}: BracketProps) {
  if (!bracket.length) {
    return (
      <p className="p-2 font-mono text-[11px] text-[var(--muted)]">
        Najpierw wygeneruj drabinkę.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-[720px] items-stretch">
        {bracket.map((round, ri) => {
          const isLastRound = ri === bracket.length - 1;
          return (
            <div key={ri} className="contents">
              <div className="flex min-w-[136px] flex-1 flex-col items-stretch">
                <div className="pb-2.5 text-center font-mono text-[8px] uppercase tracking-[2px] text-[var(--muted)]">
                  {ROUND_LABELS[ri] || `Runda ${ri + 1}`}
                </div>
                <div className="flex flex-1 flex-col justify-around">
                  {round.map((match, mi) => {
                    const isLive =
                      liveCat === currentCat &&
                      currentMatch?.round === ri &&
                      currentMatch?.match === mi;
                    const isDone = match.winner !== null;
                    const faWin = isDone && match.winner?.name === match.fighterA.name;
                    const fbWin = isDone && match.winner?.name === match.fighterB.name;
                    const cardCls = isLive
                      ? "border-[var(--gold)] shadow-[0_0_0_1px_rgba(255,215,0,0.25),0_0_18px_rgba(255,215,0,0.1)]"
                      : isDone
                        ? "opacity-[0.48] border-[var(--border)]"
                        : match.fighterA.name !== "TBD"
                          ? "border-[rgba(212,16,92,0.3)]"
                          : "border-[var(--border)]";

                    return (
                      <div
                        key={mi}
                        className={`relative mx-1 my-1 border bg-[rgba(18,18,18,0.85)] transition-all ${cardCls}`}
                      >
                        {/* Live pill */}
                        {isLive && (
                          <div className="absolute -top-2.5 left-1/2 z-[2] -translate-x-1/2 whitespace-nowrap bg-[var(--gold)] px-2 py-px font-mono text-[7px] tracking-[1px] text-black">
                            ● LIVE
                          </div>
                        )}

                        {/* Fighter A */}
                        <div
                          className={`flex items-center gap-1.5 px-2 py-1.5 font-mono text-[9px] ${
                            faWin ? "text-[var(--gold)]" : isDone ? "text-[var(--muted)] opacity-50 line-through" : ""
                          }`}
                        >
                          <span className="w-3.5 flex-shrink-0 text-right text-[8px] text-[var(--muted)]">
                            {match.fighterA.seed !== "?" ? match.fighterA.seed : ""}
                          </span>
                          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                            {match.fighterA.name}
                          </span>
                          {faWin && <span className="text-[9px]">🏆</span>}
                        </div>

                        <div className="h-px bg-[var(--border)]" />

                        {/* Fighter B */}
                        <div
                          className={`flex items-center gap-1.5 px-2 py-1.5 font-mono text-[9px] ${
                            fbWin ? "text-[var(--gold)]" : isDone ? "text-[var(--muted)] opacity-50 line-through" : ""
                          }`}
                        >
                          <span className="w-3.5 flex-shrink-0 text-right text-[8px] text-[var(--muted)]">
                            {match.fighterB.seed !== "?" ? match.fighterB.seed : ""}
                          </span>
                          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                            {match.fighterB.name}
                          </span>
                          {fbWin && <span className="text-[9px]">🏆</span>}
                        </div>

                        {/* Admin controls */}
                        {isAdmin && !isDone && (
                          <div className="flex border-t border-[var(--border)]">
                            <button
                              onClick={() => onStartMatch?.(ri, mi)}
                              disabled={isLive}
                              className={`flex-1 py-1.5 text-center font-mono text-[8px] tracking-[0.3px] transition-colors ${
                                isLive
                                  ? "cursor-default bg-[rgba(255,215,0,0.08)] text-[var(--gold)]"
                                  : "bg-[rgba(212,16,92,0.12)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white"
                              } border-r border-[var(--border)]`}
                            >
                              {isLive ? "▶ LIVE" : "▶ START"}
                            </button>
                            <button
                              onClick={onVerdict}
                              disabled={!isLive}
                              className={`flex-1 py-1.5 text-center font-mono text-[8px] tracking-[0.3px] transition-colors ${
                                isLive
                                  ? "bg-[rgba(30,144,255,0.08)] text-[var(--blue)] hover:bg-[var(--blue)] hover:text-white"
                                  : "cursor-default bg-transparent text-[#333]"
                              }`}
                            >
                              ⚡ WERDYKT
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SVG connector column */}
              {!isLastRound && (
                <div className="relative w-7 flex-shrink-0">
                  {/* Simplified connectors - vertical lines */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
