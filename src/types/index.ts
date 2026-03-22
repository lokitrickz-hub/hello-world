export interface Fighter {
  name: string;
  seed: string | number;
}

export interface Match {
  fighterA: Fighter;
  fighterB: Fighter;
  winner: Fighter | null;
}

export interface VoteData {
  side: "A" | "B";
  name: string;
  ts: number;
  cat: number;
}

export interface MatchResult {
  winner: Fighter;
  votesA: number;
  votesB: number;
  isFinal: boolean;
  judges: { name: string; side: "A" | "B" }[];
}

export interface HistoryEntry {
  date: string;
  bracket: Match[][];
  matchResults: Record<string, MatchResult>;
  champion: string | null;
}

export interface CategoryState {
  fighters: Fighter[];
  bracket: Match[][];
  currentMatch: { round: number; match: number } | null;
  matchResults: Record<string, MatchResult>;
  history: HistoryEntry[];
  publicScreen?: string;
}

export interface Judge {
  id: string;
  name: string;
  pin: string;
}

export interface Zawodnik {
  id: string;
  imie: string;
  nazwisko: string;
  pseudonim: string;
  klub: string;
  dataUrodzenia: string;
  kategoria: string;
}

export type Role = "admin" | "judge" | null;
export type ViewName = "admin" | "judge" | "public" | "history" | "zawodnicy";
export type PublicScreen = "waiting" | "intro" | "bracket" | "verdict";
