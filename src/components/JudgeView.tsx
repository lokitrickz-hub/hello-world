"use client";

import { useTournament } from "@/context/TournamentContext";

export default function JudgeView() {
  const {
    CATS,
    ROUND_NAMES,
    cats,
    liveCat,
    myId,
    myName,
    votes,
    selectedSide,
    castVote,
    submitVote,
  } = useTournament();

  const cat = cats[liveCat];
  const currentMatch = cat.currentMatch;
  const hasVoted = myId ? !!votes[myId] : false;

  if (!currentMatch || !cat.bracket.length) {
    return (
      <div className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center gap-4 text-center">
        <div className="text-4xl">⏳</div>
        <div className="font-[Landasans] text-lg tracking-[4px] text-[var(--muted)]">
          OCZEKIWANIE NA
          <br />
          KOLEJNĄ WALKĘ
        </div>
      </div>
    );
  }

  const match = cat.bracket[currentMatch.round][currentMatch.match];
  if (!match || match.winner) {
    return (
      <div className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center gap-4 text-center">
        <div className="text-4xl">⏳</div>
        <div className="font-[Landasans] text-lg tracking-[4px] text-[var(--muted)]">
          OCZEKIWANIE NA
          <br />
          KOLEJNĄ WALKĘ
        </div>
      </div>
    );
  }

  const activeSide = hasVoted ? votes[myId!].side : selectedSide;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-57px)] w-full max-w-[480px] flex-col pb-[env(safe-area-inset-bottom)]">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-3.5 pb-2 text-center">
        <div className="mb-0.5 font-mono text-[9px] uppercase tracking-[2px] text-[var(--gold)]">
          {CATS[liveCat]}
        </div>
        <div className="mb-0.5 font-mono text-[10px] uppercase tracking-[3px] text-[var(--red)]">
          {ROUND_NAMES[currentMatch.round]} — WALKA {currentMatch.match + 1}
        </div>
        <div className="font-[Landasans] text-[13px] tracking-[2px] text-[var(--muted)]">
          {match.fighterA.name} vs {match.fighterB.name}
        </div>
        <div className="mt-1 font-mono text-[9px] tracking-[2px] text-[var(--muted)]">
          Logujesz jako: <span className="text-[var(--gold)]">{myName}</span>
        </div>
      </div>

      {/* Vote buttons */}
      <div className="grid flex-1 grid-cols-2 gap-2 px-2.5">
        {/* Fighter A (Red) */}
        <button
          onClick={() => !hasVoted && castVote("A")}
          disabled={hasVoted}
          className={`relative flex flex-col items-center justify-center gap-[clamp(5px,1.5vh,10px)] overflow-hidden border-2 bg-[var(--surface)] transition-all active:scale-[0.97] ${
            activeSide === "A"
              ? "border-[var(--red)] bg-[var(--red)]/10 shadow-[0_0_30px_rgba(212,16,92,0.2)]"
              : "border-[var(--border)]"
          } ${hasVoted ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          <span className="text-[clamp(40px,11vw,72px)] font-bold leading-none text-[var(--red)]">
            {match.fighterA.name[0] || "?"}
          </span>
          <span className="px-2 text-center font-[Landasans] text-[clamp(12px,3.2vw,18px)] leading-tight tracking-[2px]">
            {match.fighterA.name}
          </span>
          {activeSide === "A" && (
            <span className="absolute right-2.5 top-2.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[var(--red)] text-[11px] text-white">
              ✓
            </span>
          )}
        </button>

        {/* Fighter B (Blue) */}
        <button
          onClick={() => !hasVoted && castVote("B")}
          disabled={hasVoted}
          className={`relative flex flex-col items-center justify-center gap-[clamp(5px,1.5vh,10px)] overflow-hidden border-2 bg-[var(--surface)] transition-all active:scale-[0.97] ${
            activeSide === "B"
              ? "border-[var(--blue)] bg-[var(--blue)]/10 shadow-[0_0_30px_rgba(30,144,255,0.2)]"
              : "border-[var(--border)]"
          } ${hasVoted ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          <span className="text-[clamp(40px,11vw,72px)] font-bold leading-none text-[var(--blue)]">
            {match.fighterB.name[0] || "?"}
          </span>
          <span className="px-2 text-center font-[Landasans] text-[clamp(12px,3.2vw,18px)] leading-tight tracking-[2px]">
            {match.fighterB.name}
          </span>
          {activeSide === "B" && (
            <span className="absolute right-2.5 top-2.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[var(--blue)] text-[11px] text-white">
              ✓
            </span>
          )}
        </button>
      </div>

      {/* Submit button */}
      {!hasVoted ? (
        <button
          onClick={submitVote}
          disabled={!selectedSide}
          className="mx-2.5 mt-3 mb-4 w-[calc(100%-20px)] border border-[var(--border)] bg-transparent py-4.5 font-[Landasans] text-xl font-bold tracking-[3px] text-[var(--fg)] transition-all hover:border-[var(--fg)] hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-25"
        >
          WYŚLIJ WERDYKT
        </button>
      ) : (
        <div className="mt-3 mb-4 text-center font-[Landasans] text-lg tracking-[2px] text-[var(--gold)]">
          ✓ GŁOS ZAREJESTROWANY
        </div>
      )}
    </div>
  );
}
