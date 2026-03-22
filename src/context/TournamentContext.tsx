"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type {
  CategoryState,
  Judge,
  VoteData,
  Match,
  Fighter,
  MatchResult,
  Role,
  ViewName,
  PublicScreen,
  Zawodnik,
} from "@/types";

const CATS = ["U12", "U16", "Open"];
const ADMIN_PIN = "1234";
const ROUND_NAMES = ["ELIMINACJE", "ĆWIERĆFINAŁY", "PÓŁFINAŁY", "FINAŁ"];

const DEMO_ZAWODNICY: Zawodnik[] = [
  { id: "z1", imie: "Michał", nazwisko: "Kowalski", pseudonim: "MikoB", klub: "Crew Warsaw", dataUrodzenia: "12.03.2013", kategoria: "U12" },
  { id: "z2", imie: "Zuzanna", nazwisko: "Nowak", pseudonim: "Zuzia", klub: "Funky Footwork", dataUrodzenia: "05.07.2012", kategoria: "U12" },
  { id: "z3", imie: "Jakub", nazwisko: "Wiśniewski", pseudonim: "JWizz", klub: "Crew Warsaw", dataUrodzenia: "19.11.2013", kategoria: "U12" },
  { id: "z4", imie: "Natalia", nazwisko: "Dąbrowska", pseudonim: "Natka", klub: "Rytm Studio", dataUrodzenia: "28.02.2012", kategoria: "U12" },
  { id: "z5", imie: "Piotr", nazwisko: "Lewandowski", pseudonim: "PLewa", klub: "Street Kings", dataUrodzenia: "09.06.2013", kategoria: "U12" },
  { id: "z6", imie: "Klaudia", nazwisko: "Wójcik", pseudonim: "Klaudi", klub: "Funky Footwork", dataUrodzenia: "14.09.2012", kategoria: "U12" },
  { id: "z7", imie: "Szymon", nazwisko: "Kamiński", pseudonim: "Shyman", klub: "Rytm Studio", dataUrodzenia: "01.04.2013", kategoria: "U12" },
  { id: "z8", imie: "Alicja", nazwisko: "Kowalczyk", pseudonim: "AliC", klub: "Street Kings", dataUrodzenia: "22.08.2012", kategoria: "U12" },
  { id: "z9", imie: "Filip", nazwisko: "Zieliński", pseudonim: "FlipZ", klub: "Crew Warsaw", dataUrodzenia: "17.12.2013", kategoria: "U12" },
  { id: "z10", imie: "Maja", nazwisko: "Szymańska", pseudonim: "Maja", klub: "Funky Footwork", dataUrodzenia: "03.05.2012", kategoria: "U12" },
  { id: "z11", imie: "Bartosz", nazwisko: "Woźniak", pseudonim: "Barto", klub: "Street Kings", dataUrodzenia: "11.10.2013", kategoria: "U12" },
  { id: "z12", imie: "Weronika", nazwisko: "Krawczyk", pseudonim: "Wero", klub: "Rytm Studio", dataUrodzenia: "25.01.2012", kategoria: "U12" },
  { id: "z13", imie: "Dawid", nazwisko: "Mazur", pseudonim: "DavMaz", klub: "Crew Warsaw", dataUrodzenia: "07.07.2013", kategoria: "U12" },
  { id: "z14", imie: "Oliwia", nazwisko: "Kaczmarek", pseudonim: "Oli", klub: "Funky Footwork", dataUrodzenia: "30.03.2012", kategoria: "U12" },
  { id: "z15", imie: "Kamil", nazwisko: "Piotrowski", pseudonim: "KPiots", klub: "Street Kings", dataUrodzenia: "18.06.2013", kategoria: "U12" },
  { id: "z16", imie: "Julia", nazwisko: "Grabowska", pseudonim: "JuGrab", klub: "Rytm Studio", dataUrodzenia: "04.11.2012", kategoria: "U12" },
  { id: "z17", imie: "Mateusz", nazwisko: "Nowakowski", pseudonim: "Mateo", klub: "Crew Warsaw", dataUrodzenia: "23.09.2008", kategoria: "U16" },
  { id: "z18", imie: "Karolina", nazwisko: "Wiśniewska", pseudonim: "Karo", klub: "Funky Footwork", dataUrodzenia: "11.02.2009", kategoria: "U16" },
  { id: "z19", imie: "Łukasz", nazwisko: "Dąbrowski", pseudonim: "LukDab", klub: "Street Kings", dataUrodzenia: "06.05.2008", kategoria: "U16" },
  { id: "z20", imie: "Paulina", nazwisko: "Lewandowska", pseudonim: "Pauli", klub: "Rytm Studio", dataUrodzenia: "19.08.2009", kategoria: "U16" },
  { id: "z21", imie: "Tomasz", nazwisko: "Wójcik", pseudonim: "Tommy", klub: "Crew Warsaw", dataUrodzenia: "14.12.2008", kategoria: "U16" },
  { id: "z22", imie: "Sandra", nazwisko: "Kamińska", pseudonim: "Sandy", klub: "Funky Footwork", dataUrodzenia: "02.04.2009", kategoria: "U16" },
  { id: "z23", imie: "Adrian", nazwisko: "Kowalczyk", pseudonim: "AdrK", klub: "Street Kings", dataUrodzenia: "27.07.2008", kategoria: "U16" },
  { id: "z24", imie: "Monika", nazwisko: "Zielińska", pseudonim: "Moni", klub: "Rytm Studio", dataUrodzenia: "15.01.2009", kategoria: "U16" },
  { id: "z25", imie: "Krzysztof", nazwisko: "Szymański", pseudonim: "KrizS", klub: "Crew Warsaw", dataUrodzenia: "08.06.2008", kategoria: "U16" },
  { id: "z26", imie: "Agata", nazwisko: "Woźniak", pseudonim: "Agata", klub: "Funky Footwork", dataUrodzenia: "21.10.2009", kategoria: "U16" },
  { id: "z27", imie: "Marcin", nazwisko: "Krawczyk", pseudonim: "MarKraw", klub: "Street Kings", dataUrodzenia: "03.03.2008", kategoria: "U16" },
  { id: "z28", imie: "Ewelina", nazwisko: "Mazur", pseudonim: "Eve", klub: "Rytm Studio", dataUrodzenia: "16.09.2009", kategoria: "U16" },
  { id: "z29", imie: "Patryk", nazwisko: "Kaczmarek", pseudonim: "Patryk", klub: "Crew Warsaw", dataUrodzenia: "09.12.2008", kategoria: "U16" },
  { id: "z30", imie: "Dominika", nazwisko: "Piotrowska", pseudonim: "Domi", klub: "Funky Footwork", dataUrodzenia: "24.05.2009", kategoria: "U16" },
  { id: "z31", imie: "Sebastian", nazwisko: "Grabowski", pseudonim: "Seba", klub: "Street Kings", dataUrodzenia: "12.08.2008", kategoria: "U16" },
  { id: "z32", imie: "Katarzyna", nazwisko: "Nowakowska", pseudonim: "Kasia", klub: "Rytm Studio", dataUrodzenia: "31.01.2009", kategoria: "U16" },
  { id: "z33", imie: "Konrad", nazwisko: "Kowalski", pseudonim: "Kondziu", klub: "Crew Warsaw", dataUrodzenia: "20.04.1998", kategoria: "Open" },
  { id: "z34", imie: "Agnieszka", nazwisko: "Nowak", pseudonim: "Aga", klub: "Funky Footwork", dataUrodzenia: "07.11.2000", kategoria: "Open" },
  { id: "z35", imie: "Paweł", nazwisko: "Wiśniewski", pseudonim: "PaWis", klub: "Street Kings", dataUrodzenia: "14.03.1995", kategoria: "Open" },
  { id: "z36", imie: "Magdalena", nazwisko: "Dąbrowska", pseudonim: "Magda", klub: "Rytm Studio", dataUrodzenia: "28.06.2001", kategoria: "Open" },
  { id: "z37", imie: "Rafał", nazwisko: "Lewandowski", pseudonim: "Rafson", klub: "Crew Warsaw", dataUrodzenia: "05.09.1997", kategoria: "Open" },
  { id: "z38", imie: "Joanna", nazwisko: "Wójcik", pseudonim: "JoWoj", klub: "Funky Footwork", dataUrodzenia: "17.02.2002", kategoria: "Open" },
  { id: "z39", imie: "Grzegorz", nazwisko: "Kamiński", pseudonim: "Grzeg", klub: "Street Kings", dataUrodzenia: "22.12.1993", kategoria: "Open" },
  { id: "z40", imie: "Anna", nazwisko: "Kowalczyk", pseudonim: "Ania", klub: "Rytm Studio", dataUrodzenia: "11.07.1999", kategoria: "Open" },
  { id: "z41", imie: "Dariusz", nazwisko: "Zieliński", pseudonim: "Daro", klub: "Crew Warsaw", dataUrodzenia: "04.04.1996", kategoria: "Open" },
  { id: "z42", imie: "Ewa", nazwisko: "Szymańska", pseudonim: "EwaSzy", klub: "Funky Footwork", dataUrodzenia: "19.10.2003", kategoria: "Open" },
  { id: "z43", imie: "Mariusz", nazwisko: "Woźniak", pseudonim: "Mario", klub: "Street Kings", dataUrodzenia: "08.01.1994", kategoria: "Open" },
  { id: "z44", imie: "Izabela", nazwisko: "Krawczyk", pseudonim: "Iza", klub: "Rytm Studio", dataUrodzenia: "25.08.2000", kategoria: "Open" },
  { id: "z45", imie: "Krystian", nazwisko: "Mazur", pseudonim: "KryMaz", klub: "Crew Warsaw", dataUrodzenia: "13.05.1998", kategoria: "Open" },
  { id: "z46", imie: "Natalia", nazwisko: "Kaczmarek", pseudonim: "Nati", klub: "Funky Footwork", dataUrodzenia: "02.03.2002", kategoria: "Open" },
  { id: "z47", imie: "Artur", nazwisko: "Piotrowski", pseudonim: "Artur", klub: "Street Kings", dataUrodzenia: "30.11.1995", kategoria: "Open" },
  { id: "z48", imie: "Monika", nazwisko: "Grabowska", pseudonim: "MonGrab", klub: "Rytm Studio", dataUrodzenia: "16.06.1997", kategoria: "Open" },
];

function mkEmptyRound(n: number): Match[] {
  return Array.from({ length: n }, () => ({
    fighterA: { name: "TBD", seed: "?" },
    fighterB: { name: "TBD", seed: "?" },
    winner: null,
  }));
}

function mkEmptyBracket(): Match[][] {
  return [mkEmptyRound(8), mkEmptyRound(4), mkEmptyRound(2), mkEmptyRound(1)];
}

function initCat(): CategoryState {
  return {
    fighters: Array.from({ length: 16 }, (_, i) => ({ name: "", seed: i + 1 })),
    bracket: mkEmptyBracket(),
    currentMatch: null,
    matchResults: {},
    history: [],
  };
}

interface TournamentContextType {
  // Constants
  CATS: string[];
  ROUND_NAMES: string[];

  // Auth
  role: Role;
  myId: string | null;
  myName: string | null;
  login: (name: string, pin: string) => boolean;
  demoMode: () => void;

  // Navigation
  activeView: ViewName;
  setActiveView: (v: ViewName) => void;

  // Categories
  cats: CategoryState[];
  setCats: React.Dispatch<React.SetStateAction<CategoryState[]>>;
  activeCat: number;
  setActiveCat: (i: number) => void;
  liveCat: number;
  setLiveCat: (i: number) => void;

  // Judges
  judges: Record<string, Judge>;
  addJudge: (name: string, pin: string) => void;
  removeJudge: (id: string) => void;

  // Votes
  votes: Record<string, VoteData>;
  selectedSide: "A" | "B" | null;
  castVote: (side: "A" | "B") => void;
  submitVote: () => void;

  // Match control
  startMatch: (catIdx: number, round: number, match: number) => void;
  showVerdict: () => { winSide: "A" | "B"; winner: Fighter } | null;

  // Public screen
  publicScreen: PublicScreen;
  setPublicScreen: (s: PublicScreen) => void;

  // Zawodnicy
  zawodnicyList: Zawodnik[];

  // Notification
  notification: string | null;
  notify: (msg: string) => void;

  // Demo
  loadDemoCat: () => void;
}

const TournamentContext = createContext<TournamentContextType | null>(null);

export function TournamentProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const [myName, setMyName] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ViewName>("admin");
  const [cats, setCats] = useState<CategoryState[]>(() => CATS.map(() => initCat()));
  const [activeCat, setActiveCat] = useState(0);
  const [liveCat, setLiveCat] = useState(0);
  const [judges, setJudges] = useState<Record<string, Judge>>({});
  const [votes, setVotes] = useState<Record<string, VoteData>>({});
  const [selectedSide, setSelectedSide] = useState<"A" | "B" | null>(null);
  const [publicScreen, setPublicScreen] = useState<PublicScreen>("waiting");
  const [zawodnicyList] = useState<Zawodnik[]>(DEMO_ZAWODNICY);
  const [notification, setNotification] = useState<string | null>(null);

  const notify = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2800);
  }, []);

  const login = useCallback((name: string, pin: string): boolean => {
    if (!name || !pin) return false;
    if (name.toLowerCase() === "admin" && pin === ADMIN_PIN) {
      setRole("admin");
      setMyId("admin");
      setMyName("Admin");
      setActiveView("admin");
      return true;
    }
    // For now, any name+pin logs in as judge (Supabase auth later)
    setRole("judge");
    setMyId("j_" + name);
    setMyName(name);
    setActiveView("judge");
    return true;
  }, []);

  const demoMode = useCallback(() => {
    setRole("admin");
    setMyId("admin");
    setMyName("Admin");
    setActiveView("admin");
  }, []);

  const addJudge = useCallback((name: string, pin: string) => {
    if (!name || pin.length !== 4) return;
    const id = "j_" + Date.now();
    setJudges((prev) => ({ ...prev, [id]: { id, name, pin } }));
  }, []);

  const removeJudge = useCallback((id: string) => {
    setJudges((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const castVote = useCallback((side: "A" | "B") => {
    setSelectedSide(side);
  }, []);

  const submitVote = useCallback(() => {
    if (!selectedSide || !myId || !myName) return;
    const vd: VoteData = { side: selectedSide, name: myName, ts: Date.now(), cat: liveCat };
    setVotes((prev) => ({ ...prev, [myId]: vd }));
    notify("Głos zarejestrowany!");
  }, [selectedSide, myId, myName, liveCat, notify]);

  const startMatch = useCallback(
    (catIdx: number, round: number, matchIdx: number) => {
      setLiveCat(catIdx);
      setVotes({});
      setSelectedSide(null);
      setCats((prev) => {
        const next = [...prev];
        next[catIdx] = { ...next[catIdx], currentMatch: { round, match: matchIdx }, publicScreen: "intro" };
        return next;
      });
      setPublicScreen("intro");
      const m = cats[catIdx].bracket[round]?.[matchIdx];
      if (m) notify(`Walka: ${m.fighterA.name} vs ${m.fighterB.name} [${CATS[catIdx]}]`);
    },
    [cats, notify]
  );

  const showVerdict = useCallback((): { winSide: "A" | "B"; winner: Fighter } | null => {
    const cat = cats[liveCat];
    if (!cat.currentMatch) {
      notify("Brak aktywnej walki");
      return null;
    }
    const vlist = Object.values(votes);
    if (!vlist.length) {
      notify("Brak głosów!");
      return null;
    }
    const m = cat.bracket[cat.currentMatch.round][cat.currentMatch.match];
    let vA = 0,
      vB = 0;
    vlist.forEach((v) => (v.side === "A" ? vA++ : vB++));
    const winSide = vA >= vB ? "A" : "B";
    const winner = winSide === "A" ? m.fighterA : m.fighterB;

    setCats((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as CategoryState[];
      const c = next[liveCat];
      const cm = c.currentMatch!;
      const match = c.bracket[cm.round][cm.match];
      match.winner = { ...winner };
      const isFinal = cm.round === 3;
      const key = `${cm.round}_${cm.match}`;
      c.matchResults[key] = {
        winner: { ...winner },
        votesA: vA,
        votesB: vB,
        isFinal,
        judges: vlist.map((v) => ({ name: v.name, side: v.side })),
      };
      // Propagate winner
      if (cm.round < c.bracket.length - 1) {
        const ni = Math.floor(cm.match / 2);
        const slot = cm.match % 2 === 0 ? "fighterA" : "fighterB";
        if (c.bracket[cm.round + 1][ni]) {
          c.bracket[cm.round + 1][ni][slot] = { ...winner };
        }
      }
      return next;
    });

    setPublicScreen("verdict");
    notify(
      cat.currentMatch.round === 3
        ? `MISTRZ ${CATS[liveCat]}: ${winner.name}`
        : `Zwycięzca: ${winner.name}`
    );
    return { winSide, winner };
  }, [cats, liveCat, votes, notify]);

  const loadDemoCat = useCallback(() => {
    const catName = CATS[activeCat];
    const pool = zawodnicyList
      .filter((z) => z.kategoria === catName)
      .sort(() => Math.random() - 0.5);

    setCats((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as CategoryState[];
      for (let mi = 0; mi < 8; mi++) {
        const fa = pool[mi * 2] || null;
        const fb = pool[mi * 2 + 1] || null;
        next[activeCat].bracket[0][mi].fighterA = fa
          ? { name: fa.pseudonim, seed: "?" }
          : { name: "TBD", seed: "?" };
        next[activeCat].bracket[0][mi].fighterB = fb
          ? { name: fb.pseudonim, seed: "?" }
          : { name: "TBD", seed: "?" };
      }
      return next;
    });
    notify(`Demo załadowane — ${catName}`);
  }, [activeCat, zawodnicyList, notify]);

  return (
    <TournamentContext.Provider
      value={{
        CATS,
        ROUND_NAMES,
        role,
        myId,
        myName,
        login,
        demoMode,
        activeView,
        setActiveView,
        cats,
        setCats,
        activeCat,
        setActiveCat,
        liveCat,
        setLiveCat,
        judges,
        addJudge,
        removeJudge,
        votes,
        selectedSide,
        castVote,
        submitVote,
        startMatch,
        showVerdict,
        publicScreen,
        setPublicScreen,
        zawodnicyList,
        notification,
        notify,
        loadDemoCat,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournament() {
  const ctx = useContext(TournamentContext);
  if (!ctx) throw new Error("useTournament must be used within TournamentProvider");
  return ctx;
}
