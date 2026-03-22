"use client";

import { useTournament } from "@/context/TournamentContext";
import Bracket from "./Bracket";

export default function PublicView() {
  const {
    CATS,
    ROUND_NAMES,
    cats,
    liveCat,
    publicScreen,
    votes,
    judges,
  } = useTournament();

  const cat = cats[liveCat];
  const currentMatch = cat.currentMatch;
  const match = currentMatch ? cat.bracket[currentMatch.round]?.[currentMatch.match] : null;

  // Judge panel helper
  function JudgePanelDisplay({ winSide }: { winSide?: "A" | "B" | null }) {
    const jlist = Object.values(judges).length > 0
      ? Object.values(judges)
      : [
          { id: "j1", name: "Sędzia 1", pin: "" },
          { id: "j2", name: "Sędzia 2", pin: "" },
          { id: "j3", name: "Sędzia 3", pin: "" },
        ];

    return (
      <div className="mt-9 flex flex-wrap justify-center gap-3.5">
        {jlist.map((j) => {
          const v = votes[j.id];
          const side = v?.side ?? null;
          const isWinner = winSide && side === winSide;
          const isLoser = winSide && side && side !== winSide;
          const borderColor = side === "A" ? "var(--red)" : side === "B" ? "var(--blue)" : "var(--border)";
          const bgColor = side === "A" ? "rgba(212,16,92,0.12)" : side === "B" ? "rgba(30,144,255,0.12)" : "var(--surface2)";

          return (
            <div
              key={j.id}
              className={`flex w-[100px] flex-col items-center gap-2 ${isLoser ? "opacity-40" : ""}`}
            >
              <div
                className={`flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 font-[Landasans] text-lg transition-all ${
                  isWinner ? "scale-[1.15] shadow-[0_0_32px_rgba(255,215,0,0.55)]" : side ? "scale-[1.08]" : ""
                }`}
                style={{
                  borderColor: isWinner ? "var(--gold)" : borderColor,
                  backgroundColor: isWinner ? "rgba(255,215,0,0.18)" : bgColor,
                  color: isWinner ? "var(--gold)" : side === "A" ? "var(--red)" : side === "B" ? "var(--blue)" : "var(--muted)",
                }}
              >
                {j.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="text-center font-mono text-[8px] uppercase tracking-[1.5px] text-[var(--muted)]">
                {j.name}
              </div>
              <div className="text-center font-mono text-[7px] tracking-[1px] text-[var(--border)]">
                {side && match ? (side === "A" ? match.fighterA.name : match.fighterB.name) : "···"}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Waiting screen
  if (publicScreen === "waiting") {
    return (
      <div className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center">
        <div className="text-center text-3xl font-bold tracking-[6px] text-[var(--gold)]">
          WTG 2026
        </div>
        <div className="mt-5 font-mono text-[11px] tracking-[4px] text-[var(--muted)]">
          SYSTEM SĘDZIOWANIA / TRICKLING TOURNAMENT
        </div>
      </div>
    );
  }

  // Intro screen
  if (publicScreen === "intro" && match && currentMatch) {
    return (
      <div className="relative flex min-h-[calc(100vh-57px)] flex-col items-center justify-center gap-8 overflow-hidden px-7 py-12">
        {/* Giant VS watermark */}
        <div className="pointer-events-none absolute left-1/2 top-[45%] z-[2] -translate-x-1/2 -translate-y-1/2 font-[Landasans] text-[55vh] leading-none text-white/[0.02]">
          VS
        </div>

        {/* Labels */}
        <div className="z-[3] flex flex-col items-center gap-2">
          <div className="font-[Landasans] text-base tracking-[4px] text-[var(--gold)]">
            {CATS[liveCat]}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--muted)]">
            {ROUND_NAMES[currentMatch.round]} — WALKA {currentMatch.match + 1}
          </div>
        </div>

        {/* Fighters */}
        <div className="z-[3] flex w-full max-w-[900px] flex-col items-center justify-center gap-20 sm:flex-row">
          {/* Fighter A */}
          <div className="flex max-w-[320px] flex-1 flex-col items-center gap-4">
            <div className="flex h-[356px] w-[200px] items-center justify-center overflow-hidden rounded-lg border-2 border-[var(--red)] bg-gradient-to-br from-[rgba(212,16,92,0.2)] to-[rgba(212,16,92,0.05)] font-[Landasans] text-[90px] text-[var(--red)] shadow-[0_0_60px_rgba(212,16,92,0.15)]">
              {match.fighterA.name[0] || "?"}
            </div>
            <div className="w-full text-center font-[Landasans] text-[clamp(26px,3.8vw,50px)] tracking-[3px] text-[var(--red)]">
              {match.fighterA.name}
            </div>
          </div>

          {/* Fighter B */}
          <div className="flex max-w-[320px] flex-1 flex-col items-center gap-4">
            <div className="flex h-[356px] w-[200px] items-center justify-center overflow-hidden rounded-lg border-2 border-[var(--blue)] bg-gradient-to-br from-[rgba(30,144,255,0.2)] to-[rgba(30,144,255,0.05)] font-[Landasans] text-[90px] text-[var(--blue)] shadow-[0_0_60px_rgba(30,144,255,0.15)]">
              {match.fighterB.name[0] || "?"}
            </div>
            <div className="w-full text-center font-[Landasans] text-[clamp(26px,3.8vw,50px)] tracking-[3px] text-[var(--blue)]">
              {match.fighterB.name}
            </div>
          </div>
        </div>

        {/* Judge panel */}
        <div className="z-[3]">
          <JudgePanelDisplay />
        </div>
      </div>
    );
  }

  // Bracket screen
  if (publicScreen === "bracket") {
    return (
      <div className="flex min-h-[calc(100vh-57px)] flex-col p-7">
        <div className="mb-4 font-[Landasans] text-xl tracking-[4px] text-[var(--gold)]">
          DRABINKA — {CATS[liveCat]}
        </div>
        <Bracket
          bracket={cat.bracket}
          matchResults={cat.matchResults}
        />
      </div>
    );
  }

  // Verdict screen
  if (publicScreen === "verdict" && match && currentMatch) {
    const vlist = Object.values(votes);
    let vA = 0, vB = 0;
    vlist.forEach((v) => (v.side === "A" ? vA++ : vB++));
    const winSide: "A" | "B" = vA >= vB ? "A" : "B";
    const winner = winSide === "A" ? match.fighterA : match.fighterB;
    const isFinal = currentMatch.round === 3;

    return (
      <div className="relative flex min-h-[calc(100vh-57px)] flex-col items-center justify-center overflow-hidden bg-[rgba(5,5,5,0.7)]">
        {/* Glow */}
        <div
          className={`absolute h-[700px] w-[700px] rounded-full blur-[100px] transition-all duration-1000 ${
            winSide === "A" ? "bg-[rgba(212,16,92,0.25)] opacity-100" : "bg-[rgba(30,144,255,0.25)] opacity-100"
          }`}
        />

        {/* Content */}
        <div className="relative z-[1] text-center animate-[verdictReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[5px] text-[var(--muted)]">
            ZWYCIĘZCA
          </div>

          <div className="mb-3.5 font-[Landasans] text-lg tracking-[4px] text-[var(--gold)]">
            {CATS[liveCat]}
          </div>

          {/* Winner initial */}
          <div
            className={`mx-auto mb-6 flex h-[220px] w-[220px] items-center justify-center rounded-lg border-3 font-[Landasans] text-[96px] ${
              winSide === "A"
                ? "border-[var(--red)] shadow-[0_0_60px_rgba(212,16,92,0.35)] text-[var(--red)]"
                : "border-[var(--blue)] shadow-[0_0_60px_rgba(30,144,255,0.35)] text-[var(--blue)]"
            }`}
          >
            {(winner.name[0] || "?").toUpperCase()}
          </div>

          <div
            className={`mb-1.5 font-[Landasans] text-[clamp(56px,11vw,112px)] leading-none tracking-[6px] ${
              winSide === "A"
                ? "text-[var(--red)] [text-shadow:0_0_60px_rgba(212,16,92,0.5)]"
                : "text-[var(--blue)] [text-shadow:0_0_60px_rgba(30,144,255,0.5)]"
            }`}
          >
            {winner.name}
          </div>

          <div className="mt-3.5 font-mono text-lg text-[var(--muted)]">
            {vA} — {vB}
          </div>

          {!isFinal && (
            <div className="mt-2.5 font-[Landasans] text-lg tracking-[4px] text-[var(--gold)]">
              AWANSUJE DO NASTĘPNEJ RUNDY
            </div>
          )}

          <JudgePanelDisplay winSide={winSide} />
        </div>
      </div>
    );
  }

  return null;
}
