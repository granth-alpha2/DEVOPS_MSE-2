"use client";

import React, { Suspense, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AppShell from "../../../components/AppShell";
import {
  SoilLayerRecord,
  createDelhiNcrThreeLayerReport,
  createDemoThreeLayerReport,
  analyzeSoilProfile,
  rateNutrientStatus,
} from "@/lib/soil-service";
import type { FarmRecord } from "@/app/api/farms/repository";

function SoilAnalysisContent() {
  const searchParams = useSearchParams();
  const initialFarmId = searchParams.get("farmId") || "delhi-ncr-farm";

  const [farms, setFarms] = useState<FarmRecord[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<string>(initialFarmId);

  useEffect(() => {
    async function loadFarms() {
      try {
        const res = await fetch("/api/farms");
        if (res.ok) {
          const json = await res.json();
          const list: FarmRecord[] = json.farms || [];
          setFarms(list);
        }
      } catch {
        // Fallback
      }
    }
    loadFarms();
  }, []);

  // Generate 3-layer report for selected farm
  const report = useMemo(() => {
    if (selectedFarmId.toLowerCase().includes("delhi") || selectedFarmId === "delhi-ncr-farm") {
      return createDelhiNcrThreeLayerReport(selectedFarmId);
    }
    return createDemoThreeLayerReport(selectedFarmId);
  }, [selectedFarmId]);

  const analysis = useMemo(() => {
    return analyzeSoilProfile(report.layers);
  }, [report]);

  const isDelhi = selectedFarmId.toLowerCase().includes("delhi") || selectedFarmId === "delhi-ncr-farm";

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <header className="p-6 sm:p-8 bg-white border-2 border-slate-200 rounded-3xl shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🔬</span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-black text-xs uppercase tracking-wider border border-emerald-200">
              Layer 5 · 3-Layer Agronomic Analysis
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/farm/soil"
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-all"
            >
              ← Back to Soil Services
            </Link>
            <Link
              href={`/reports/soil?region=${isDelhi ? "delhi" : "punjab"}`}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              📄 Printable Soil Health Card
            </Link>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk']">
          3-Layer Vertical Chemical Profile & Subsoil Health
        </h1>
        <p className="text-sm text-slate-600">
          Evaluates soil stratification across 0-15cm (Surface plow layer), 15-30cm (Subsurface rootzone), and 30-60cm (Deep subsoil). Detects hardpans, salinity gradients, and nutrient exhaustion.
        </p>

        {/* Farm Selector Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-500">Active Soil Sample:</span>
            <select
              value={selectedFarmId}
              onChange={(e) => setSelectedFarmId(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
            >
              <option value="delhi-ncr-farm">
                🏛️ Delhi NCR — Ujwa / Najafgarh Basin (3.50 ac, Sandy Loam) [Card ID: SHC-DL-2024-09821]
              </option>
              {farms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.areaAcres.toFixed(1)} ac - {f.preferences?.soilType || "Alluvial"})
                </option>
              ))}
              <option value="default-farm">🌾 Punjab — Bathinda Main Field (2.50 ac, Loam)</option>
            </select>
          </div>

          <span className="text-[11px] text-slate-500 font-mono">
            Lab: <strong>{report.laboratoryName}</strong>
          </span>
        </div>
      </header>

      {/* Cross-Layer Health Score Summary */}
      <div className="p-6 bg-white border-2 border-slate-200 rounded-3xl shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
              Overall Vertical Health Rating
            </span>
            <div className="text-2xl font-black text-emerald-800 font-['Space_Grotesk'] mt-0.5">
              {analysis.overallHealthRating.replace(/_/g, " ")}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Profile Depth:</span>
              <strong className="text-slate-900">{analysis.effectiveProfileDepthCm} cm</strong>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Layers Evaluated:</span>
              <strong className="text-slate-900">{analysis.totalLayersAvailable} Layers</strong>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Data Confidence:</span>
              <strong className="text-emerald-700 font-bold">{(analysis.confidenceScore * 100).toFixed(0)}% (ICAR Verified)</strong>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed font-sans">
          <strong>Stratification Analysis:</strong> {analysis.verticalSummary}
        </p>

        {/* Detected Constraints and Strengths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <span>⚠️</span> Detected Sub-Surface Constraints ({analysis.limitations.length})
            </span>
            <ul className="text-xs text-amber-900 space-y-1.5">
              {analysis.limitations.map((lim, idx) => (
                <li key={idx} className="leading-snug">
                  • <strong>{lim.title}</strong>: {lim.description} (Affected Layers: {lim.affectedLayers.join(", ")})
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <span>✓</span> Agronomic Soil Strengths ({analysis.strengths.length})
            </span>
            <ul className="text-xs text-emerald-900 space-y-1">
              {analysis.strengths.map((str, idx) => (
                <li key={idx} className="leading-snug">• {str}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3-Layer Comparative Columns */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 font-['Space_Grotesk']">
          Layer-by-Layer Chemical & Physical Matrix
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {report.layers.map((layer) => {
            const ph = layer.parameters["ph"]?.normalizedValue ?? 7.2;
            const ec = layer.parameters["ec"]?.normalizedValue ?? 0.7;
            const oc = layer.parameters["organic_carbon"]?.normalizedValue ?? 0.55;
            const n = layer.parameters["nitrogen"]?.normalizedValue ?? 260;
            const p = layer.parameters["phosphorus"]?.normalizedValue ?? 16;
            const k = layer.parameters["potassium"]?.normalizedValue ?? 190;
            const zn = layer.parameters["zinc"]?.normalizedValue ?? 0.75;
            const s = layer.parameters["sulphur"]?.normalizedValue ?? 12.0;

            return (
              <div
                key={layer.layerNumber}
                className="p-6 bg-white border-2 border-slate-200 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-700">Stratum #{layer.layerNumber}</span>
                      <h3 className="text-xl font-black text-slate-900 font-['Space_Grotesk']">
                        {layer.depthStartCm}–{layer.depthEndCm} cm
                      </h3>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider ${
                        layer.condition === "Good"
                          ? "bg-emerald-100 text-emerald-800"
                          : layer.condition === "Moderate"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {layer.condition}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                      <span className="text-slate-600 font-medium">Soil Reaction (pH):</span>
                      <span className="font-mono font-bold text-slate-900">{ph}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                      <span className="text-slate-600 font-medium">Salinity EC (dS/m):</span>
                      <span className="font-mono font-bold text-slate-900">{ec}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                      <span className="text-slate-600 font-medium">Organic Carbon (%):</span>
                      <span className="font-mono font-bold text-slate-900">{oc}%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                      <span className="text-slate-600 font-medium">Available N (kg/ha):</span>
                      <span className="font-mono font-bold text-slate-900">{n} ({rateNutrientStatus("nitrogen", n)})</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                      <span className="text-slate-600 font-medium">Available P (kg/ha):</span>
                      <span className="font-mono font-bold text-slate-900">{p} ({rateNutrientStatus("phosphorus", p)})</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                      <span className="text-slate-600 font-medium">Available K (kg/ha):</span>
                      <span className="font-mono font-bold text-slate-900">{k} ({rateNutrientStatus("potassium", k)})</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                      <span className="text-slate-600 font-medium">Available Zn (ppm):</span>
                      <span className="font-mono font-bold text-slate-900">{zn} ppm</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                      <span className="text-slate-600 font-medium">Available S (ppm):</span>
                      <span className="font-mono font-bold text-slate-900">{s} ppm</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  {layer.strengths.length > 0 && <div>✓ {layer.strengths[0]}</div>}
                  {layer.limitations.length > 0 && <div className="text-amber-700">⚠️ {layer.limitations[0]}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <Link
          href="/farm/soil"
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
        >
          ← Back to Soil Services
        </Link>

        <Link
          href={`/farm/soil/fertilizer?farmId=${selectedFarmId}`}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-2"
        >
          <span>Calculate Precision Fertilizer Plan (Level 6)</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

export default function SoilAnalysisPage() {
  return (
    <AppShell pageTitle="3-Layer Soil Chemical Analysis">
      <Suspense fallback={<div className="p-8 text-center text-slate-500 font-bold">Analyzing 3-layer vertical soil profile...</div>}>
        <SoilAnalysisContent />
      </Suspense>
    </AppShell>
  );
}
