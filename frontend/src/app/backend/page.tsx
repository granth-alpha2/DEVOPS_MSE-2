"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "../components/AppShell";
import { showcaseCards } from "./showcase-data";

export default function BackendModePage() {
  const [health, setHealth] = useState<"checking" | "healthy" | "unavailable">("checking");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled) setHealth(data.status === "HEALTHY" ? "healthy" : "unavailable");
      })
      .catch(() => {
        if (!cancelled) setHealth("unavailable");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AppShell pageTitle="Backend Mode - DevOps Showcase">
      <main className="mx-auto max-w-7xl space-y-6 pb-10">
        <section className="showcase-hero">
          <div>
            <p className="showcase-kicker">Backend & DevOps control center</p>
            <h1>How AgriProfit works internally</h1>
            <p>
              Select a component to open a layered technical view with the actual
              repository files and request flow.
            </p>
          </div>
          <Link href="/" onClick={() => sessionStorage.setItem("agriprofit_showcase_mode", "frontend")} className="showcase-back-button">
            ← Frontend Mode
          </Link>
        </section>

        <div className="showcase-status-bar">
          <span>Runtime health</span>
          <strong className={`showcase-health ${health}`}>
            {health === "healthy" ? "● /api/health reachable" : health === "checking" ? "● Checking runtime" : "● Runtime unavailable"}
          </strong>
          <p>Live status only. Docker and CI status are verified from configuration.</p>
        </div>

        <section className="showcase-card-grid" aria-label="Backend implementation components">
          {showcaseCards.map((card, index) => (
            <Link
              key={card.key}
              href={`/backend/${card.key}`}
              className={`showcase-card showcase-card-${card.accent}`}
              style={{ "--card-delay": `${index * 55}ms` } as React.CSSProperties}
            >
              <div className="showcase-card-top">
                <span className="showcase-card-icon">{card.icon}</span>
                <span className={`showcase-status status-${card.status.toLowerCase().replaceAll(" ", "-")}`}>
                  {card.status}
                </span>
              </div>
              <div>
                <h2>{card.title}</h2>
                <p className="showcase-tech">{card.technology}</p>
                <p className="showcase-description">{card.description}</p>
              </div>
              <span className="showcase-open-link">Open layered view <b>→</b></span>
            </Link>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
