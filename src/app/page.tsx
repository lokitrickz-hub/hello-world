"use client";

import { TournamentProvider, useTournament } from "@/context/TournamentContext";
import LoginOverlay from "@/components/LoginOverlay";
import Navbar from "@/components/Navbar";
import AdminView from "@/components/AdminView";
import JudgeView from "@/components/JudgeView";
import PublicView from "@/components/PublicView";
import HistoryView from "@/components/HistoryView";
import FightersView from "@/components/FightersView";
import Notification from "@/components/Notification";

function AppContent() {
  const { role, activeView } = useTournament();

  return (
    <>
      <LoginOverlay />
      {role && (
        <>
          <Navbar />
          <main className="flex-1">
            {activeView === "admin" && <AdminView />}
            {activeView === "judge" && <JudgeView />}
            {activeView === "public" && <PublicView />}
            {activeView === "history" && <HistoryView />}
            {activeView === "zawodnicy" && <FightersView />}
          </main>
        </>
      )}
      <Notification />
    </>
  );
}

export default function Home() {
  return (
    <TournamentProvider>
      <AppContent />
    </TournamentProvider>
  );
}
