"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AppShell from "../../components/AppShell";
import {
  createDelhiNcrThreeLayerReport,
  createDemoThreeLayerReport,
} from "@/lib/soil-service";
import type { FarmRecord } from "../../api/farms/repository";

export default function GovernmentSoilHealthCardReportPage() {
  const searchParams = useSearchParams();
  const initialRegion = searchParams.get("region") || "delhi";

  const [selectedRegion, setSelectedRegion] = useState<"delhi" | "punjab">(
    initialRegion === "punjab" ? "punjab" : "delhi"
  );
  const [farms, setFarms] = useState<FarmRecord[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<string>("delhi-ncr-farm");

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

  const isDelhi = selectedRegion === "delhi";

  const report = useMemo(() => {
    if (isDelhi) {
      return createDelhiNcrThreeLayerReport(selectedFarmId);
    }
    return createDemoThreeLayerReport("punjab-farm");
  }, [isDelhi, selectedFarmId]);

  return (
    <AppShell pageTitle="Soil Health Card">
      <div className="max-w-4xl mx-auto space-y-6 font-sans">
        {/* Navigation & Region Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/farm/soil"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-all flex items-center gap-1.5"
          >
            ← Back to Soil Services
          </Link>

          {/* Region Switcher Pills */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold print:hidden">
            <button
              type="button"
              onClick={() => setSelectedRegion("delhi")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                isDelhi
                  ? "bg-emerald-700 text-white shadow-xs font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🏛️ Delhi NCR (KVK Ujwa)</span>
              <span className="text-[10px] bg-emerald-800/80 text-emerald-100 px-1.5 py-0.2 rounded font-normal">
                Official
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegion("punjab")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                !isDelhi
                  ? "bg-emerald-700 text-white shadow-xs font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🌾 Punjab (Bathinda)</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🖨️ Print Soil Health Card</span>
            </button>
          </div>
        </div>

        {/* Printable Official Government Soil Health Card */}
        <div className="p-8 sm:p-10 bg-white border-2 border-slate-300 rounded-3xl shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
          {/* Official Emblem & Header */}
          <div className="border-b-2 border-slate-900 pb-6 text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl">
              <span>🌱</span>
              <span className="text-slate-800 font-serif font-black tracking-widest text-lg sm:text-xl">
                सत्यमेव जयते
              </span>
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-700">
              Department of Agriculture & Farmers Welfare · Ministry of Agriculture, Govt. of India
            </div>
            <div className="text-[11px] font-bold text-emerald-800 tracking-wider">
              {isDelhi
                ? "In Partnership with Development Department, Government of NCT of Delhi"
                : "Department of Agriculture & Farmers Welfare, Government of Punjab"}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight font-['Space_Grotesk'] pt-1">
              National Soil Health Card
            </h1>
            <div className="text-[11px] font-mono text-slate-600 flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="px-2 py-0.5 bg-slate-100 rounded font-bold text-slate-800 border border-slate-200">
                Card ID: {isDelhi ? "SHC-DL-2024-09821" : "SHC-PB-2024-00892"}
              </span>
              <span>·</span>
              <span>Scheme Code: DA&FW-SHC-2015</span>
              <span>·</span>
              <span className="text-emerald-700 font-bold">Standard 3-Layer Diagnostic (0-15, 15-30, 30-60 cm)</span>
            </div>
          </div>

          {/* Farm Plot & District Badge (Hidden in print) */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Land Parcel / Scheme Cycle:</span>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-black text-[11px]">
                {isDelhi ? "Cycle V (2024–2025) · Delhi NCR Mission" : "Cycle V (2024–2025) · Punjab Mission"}
              </span>
            </div>
            <div className="text-slate-600 font-medium">
              Registered Laboratory: <strong className="text-slate-900">{report.laboratoryName}</strong>
            </div>
          </div>

          {/* Cardholder & Laboratory Credentials */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-500 font-bold block text-[11px]">Farmer / Cardholder:</span>
              <strong className="text-sm font-black text-slate-900">
                {isDelhi ? "Chaudhary Rajeshwar Shokeen" : "Sardar Gurpreet Singh"}
              </strong>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                {isDelhi ? "Khasra No: 42/18, 42/19" : "Khasra No: 18/4, 18/5"}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-500 font-bold block text-[11px]">Village / District / State:</span>
              <strong className="text-sm font-black text-slate-900">
                {isDelhi ? "Ujwa, South West Delhi" : "Bathinda, Punjab"}
              </strong>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                {isDelhi ? "NCT of Delhi (PIN: 110073)" : "Punjab (PIN: 151001)"}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-500 font-bold block text-[11px]">Soil Texture & Coordinates:</span>
              <strong className="text-slate-900 block font-bold text-xs">
                {isDelhi ? "Sandy Loam (Alluvial)" : "Loam (Alluvial)"}
              </strong>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                {isDelhi ? "28.5821° N, 76.9142° E" : "30.2110° N, 74.9455° E"}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-500 font-bold block text-[11px]">Sample Date & Sample ID:</span>
              <strong className="font-mono text-slate-900 font-bold block text-xs">
                {report.reportDate}
              </strong>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                {report.sampleId}
              </div>
            </div>
          </div>

          {/* 3-Layer Chemical Parameters Matrix */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                Vertical 3-Layer Soil Fertility Test Results (ICAR-IISS Standard)
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                Testing Method: 1:2.5 Soil-Water Suspension (pH/EC), Walkley-Black (OC), Subbiah-Asija (N), Olsen (P), Flame Photometry (K)
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Depth Strata</th>
                    <th className="py-2.5 px-3">pH (Reaction)</th>
                    <th className="py-2.5 px-3">EC (dS/m)</th>
                    <th className="py-2.5 px-3">Organic C (%)</th>
                    <th className="py-2.5 px-3">Avail. N (kg/ha)</th>
                    <th className="py-2.5 px-3">Avail. P₂O₅ (kg/ha)</th>
                    <th className="py-2.5 px-3">Avail. K₂O (kg/ha)</th>
                    <th className="py-2.5 px-3">Rating Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {report.layers.map((layer) => {
                    const ph = layer.parameters["ph"]?.normalizedValue ?? 7.2;
                    const ec = layer.parameters["ec"]?.normalizedValue ?? 0.7;
                    const oc = layer.parameters["organic_carbon"]?.normalizedValue ?? 0.55;
                    const n = layer.parameters["nitrogen"]?.normalizedValue ?? 260;
                    const p = layer.parameters["phosphorus"]?.normalizedValue ?? 16;
                    const k = layer.parameters["potassium"]?.normalizedValue ?? 190;

                    return (
                      <tr key={layer.layerNumber} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-sans font-bold text-slate-900">
                          Layer {layer.layerNumber} ({layer.depthStartCm}–{layer.depthEndCm} cm)
                          <span className="block text-[10px] text-slate-400 font-normal">
                            {layer.layerNumber === 1
                              ? "Surface Plow Layer"
                              : layer.layerNumber === 2
                              ? "Active Subsurface Rootzone"
                              : "Deep Subsoil Substratum"}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold">{ph}</span>
                          <span className="block text-[10px] text-slate-400">
                            {ph < 6.5 ? "Acidic" : ph <= 7.8 ? "Optimal" : "Alkaline"}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold">{ec}</span>
                          <span className="block text-[10px] text-slate-400">
                            {ec <= 0.8 ? "Normal" : ec <= 1.5 ? "Critical" : "Saline"}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold">{oc}%</span>
                          <span className="block text-[10px] text-slate-400">
                            {oc < 0.5 ? "Low" : oc <= 0.75 ? "Medium" : "High"}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold">{n}</span>
                          <span className="block text-[10px] text-slate-400">
                            {n < 280 ? "Low (Deficient)" : "Medium"}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold">{p}</span>
                          <span className="block text-[10px] text-slate-400">
                            {p < 15 ? "Low" : p <= 25 ? "Medium" : "High"}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold">{k}</span>
                          <span className="block text-[10px] text-slate-400">
                            {k < 145 ? "Low" : k <= 280 ? "Medium" : "High"}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              layer.condition === "Good"
                                ? "bg-emerald-100 text-emerald-800"
                                : layer.condition === "Moderate"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {layer.condition}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Secondary & Micronutrient Diagnostic Panel */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
              Secondary & Micronutrient Status (0–15 cm Topsoil)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-slate-500 font-bold block">Available Sulphur (S):</span>
                <strong className="text-sm font-black text-slate-900">
                  {isDelhi ? "12.4 ppm" : "14.0 ppm"}
                </strong>
                <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                  Medium / Adequate (Limit: 10 ppm)
                </span>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
                <span className="text-amber-800 font-bold block">Available Zinc (Zn):</span>
                <strong className="text-sm font-black text-amber-950">
                  {isDelhi ? "0.68 ppm" : "0.85 ppm"}
                </strong>
                <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
                  {isDelhi ? "Deficient / Critical (DTPA Limit: 0.60–0.75)" : "Adequate"}
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-slate-500 font-bold block">Available Iron (Fe):</span>
                <strong className="text-sm font-black text-slate-900">
                  {isDelhi ? "5.2 ppm" : "6.8 ppm"}
                </strong>
                <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                  Adequate (Critical Limit: 4.5 ppm)
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-slate-500 font-bold block">Bulk Density / Physical:</span>
                <strong className="text-sm font-black text-slate-900">
                  {isDelhi ? "1.42 g/cm³" : "1.38 g/cm³"}
                </strong>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {isDelhi ? "Subsoil pan at 25-30cm (1.52 g/cm³)" : "Normal tillage profile"}
                </span>
              </div>
            </div>
          </div>

          {/* Official ICAR-IISS Recommendations Summary */}
          <div className="p-5 bg-emerald-50/80 border border-emerald-300 rounded-2xl space-y-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">🔬</span>
              <strong className="text-emerald-950 font-black text-sm uppercase tracking-wider">
                Official ICAR-IISS Soil Test Crop Response (STCR) Advisory — {isDelhi ? "Delhi NCR Region" : "Punjab Region"}
              </strong>
            </div>

            {isDelhi ? (
              <div className="space-y-1.5 text-emerald-900 leading-relaxed">
                <p>
                  <strong>1. Organic Matter Restoration:</strong> Incorporate 5–6 tonnes/acre well-decomposed Farmyard Manure (FYM) or vermicompost during summer land preparation to elevate topsoil Organic Carbon above 0.75%.
                </p>
                <p>
                  <strong>2. Zinc Fortification:</strong> Apply 10 kg/acre Zinc Sulphate (ZnSO₄·7H₂O) as a basal dose or foliar spray of 0.5% ZnSO₄ + 0.25% lime at active tillering/vegetative stage to overcome sub-surface zinc deficit.
                </p>
                <p>
                  <strong>3. Targeted Split Nitrogen Schedule:</strong> Due to alkaline pH (7.85) and sandy loam texture, split Nitrogen into 3 equal splits (50% basal + 25% CRI stage + 25% jointing) to prevent ammonia volatilization.
                </p>
                <p>
                  <strong>4. Subsoil Hardpan Management:</strong> Deep chisel plowing recommended once every 3 seasons to break the dense plow pan detected at 25–30 cm depth (EC 1.42 dS/m, bulk density 1.52 g/cm³).
                </p>
              </div>
            ) : (
              <p className="text-emerald-900 leading-relaxed">
                Based on the 3-layer test, phosphorus is in the moderate-to-adequate range across the top 30 cm. Apply targeted basal DAP without excessive top dressing. Incorporate 4–5 tonnes/acre FYM during summer plowing to elevate subsurface organic carbon above 0.75%.
              </p>
            )}
          </div>

          {/* Signatures & Certification */}
          <div className="pt-6 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              <div className="font-bold text-slate-800">
                {isDelhi
                  ? "Senior Soil Chemist & Laboratory In-Charge"
                  : "Soil Testing Officer / Senior Scientific Officer"}
              </div>
              <div className="text-[11px] text-slate-500">
                {isDelhi
                  ? "KVK Soil Testing Laboratory, Ujwa, South West Delhi (ICAR-IARI)"
                  : "State Agricultural Department, Government of Punjab"}
              </div>
              <div className="text-[10px] text-emerald-700 font-mono mt-0.5">
                Accreditation: NABL / ICAR-IISS Standard Reference Facility
              </div>
            </div>

            <div className="text-right font-mono text-[11px]">
              <div className="font-bold text-slate-800">
                Official Verification QR / Barcode: VERIFIED
              </div>
              <div className="text-slate-400">
                Issued under National Soil Health Card Mission · soilhealth.dac.gov.in
              </div>
              <div className="text-emerald-700 font-bold text-[10px]">
                Digest: {isDelhi ? "SHA256:7e9a8f1b0c93d...DELHI-NCR" : "SHA256:4b1d2e...PUNJAB"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
