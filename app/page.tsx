"use client";

import { useState } from "react";
import robotData from "@/data/robots.json";

type Stat = { label: string; value: string };
type Champion = {
  name: string;
  company: string;
  country: string;
  reason: string;
  stats: Stat[];
  latestUpdate: string;
};
type Category = {
  id: string;
  label: string;
  accent: string;
  champion: Champion;
};

function RobotCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const { label, accent, champion } = category;

  return (
    <div
      className="card-animate rounded-xl overflow-hidden border border-border bg-surface hover:bg-surface-hover transition-colors duration-200"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ backgroundColor: accent }} />

      <div className="p-6">
        {/* Category label */}
        <div
          className="font-mono text-xs font-bold uppercase tracking-wider mb-1"
          style={{ color: accent }}
        >
          {label}
        </div>
        <div className="text-text-dim text-xs mb-3">Current Champion</div>

        {/* Robot name */}
        <h3 className="text-2xl font-bold text-text mb-1">{champion.name}</h3>
        <p className="text-text-dim text-sm mb-4">
          {champion.company} · {champion.country}
        </p>

        {/* Reason - quote style */}
        <div
          className="border-l-2 pl-4 mb-5 text-sm text-text-dim leading-relaxed"
          style={{ borderColor: accent }}
        >
          {champion.reason}
        </div>

        {/* 2x2 Stats grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {champion.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-bg rounded-lg px-3 py-2.5 border border-border"
            >
              <div className="text-text-muted text-[10px] font-mono uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-text text-sm font-semibold mt-0.5">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Latest update */}
        <div className="flex items-start gap-2 text-xs text-text-muted">
          <span className="inline-block w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: accent }} />
          {champion.latestUpdate}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const categories: Category[] = robotData.categories;

  const filtered =
    activeFilter === "all"
      ? categories
      : categories.filter((c) => c.id === activeFilter);

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-4 pt-16 pb-10 text-center">
        <p className="text-text-muted text-sm font-mono tracking-wider uppercase mb-3">
          One Prompt Away presents
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 tracking-tight">
          Best Robot in the World
        </h1>
        <p className="text-text-dim text-base max-w-2xl mx-auto leading-relaxed mb-5">
          A curated leaderboard of the world&apos;s most capable robots,
          organized by what they do best. Updated as the field evolves.
        </p>
        <span className="inline-block font-mono text-xs text-text-muted border border-border rounded-full px-3 py-1">
          Last updated: {robotData.lastUpdated}
        </span>
      </header>

      {/* Filter bar */}
      <nav className="max-w-5xl mx-auto px-4 mb-10">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveFilter("all")}
            className={`font-mono text-xs px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
              activeFilter === "all"
                ? "bg-text text-bg border-text"
                : "border-border text-text-dim hover:border-text-dim"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveFilter(activeFilter === cat.id ? "all" : cat.id)
              }
              className={`font-mono text-xs px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
                activeFilter === cat.id
                  ? "text-bg border-transparent"
                  : "border-border text-text-dim hover:border-text-dim"
              }`}
              style={
                activeFilter === cat.id
                  ? { backgroundColor: cat.accent }
                  : undefined
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Card grid */}
      <main className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" key={activeFilter}>
          {filtered.map((cat, i) => (
            <RobotCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-10 text-center">
        <p className="font-mono text-sm text-text-dim mb-2">
          Best Robot in the World
        </p>
        <p className="text-xs text-text-muted">
          Curated by One Prompt Away · Data from public sources · Rankings
          reflect editorial judgment
        </p>
      </footer>
    </div>
  );
}
