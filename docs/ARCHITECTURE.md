# AgriProfit — System Architecture & Design Specification

## 1. Executive Architecture Summary

AgriProfit is an AI-powered agricultural decision-support platform designed for Indian farmers. It bridges real-time agro-meteorology, geospatial field boundary analysis, APMC mandi market trends, and trained machine learning pipelines into an actionable **4-Part Multi-Crop Farm Plan**.

```text
                                 FARMER
                                    │
                                    ▼
                             FARM BOUNDARY MAP
                     (📍 Use My Location / Manual GPS)
                                    │
                                    ▼
                         Spherical Geodesic Engine
                         (Area in m², ha, acres)
                                    │
                                    ▼
                     PostGIS Geography (POLYGON 4326)
                                    │
            ┌───────────────────────┼───────────────────────┐
            ▼                       ▼                       ▼
   Live Open-Meteo Weather     APMC Mandi Prices       Soil & Crop Profiles
   (Rain, Temp, Humidity)     (Modal Price, MSP)      (NPK, pH, Duration)
            │                       │                       │
            └───────────────────────┼───────────────────────┘
                                    │
                                    ▼
                             ML MICROSERVICE
                     (FastAPI + Scikit-Learn v2.0)
                     ├── Random Forest Yield Model
                     └── Ensemble Mandi Price Forecaster
                                    │
                                    ▼
                     4-PART PORTFOLIO STRATEGY
                     ├── Part 1: Safety / MSP Floor (50%)
                     ├── Part 2: Stability Cash Crop (25%)
                     ├── Part 3: Profit Opportunity (15%)
                     └── Part 4: Soil Diversity (10%)
                                    │
                                    ▼
                      FINANCIAL SENSITIVITY SIMULATION
                    (Expected Yield, Cost, Revenue, Net Profit)
                                    │
                                    ▼
                      MULTIMODAL AI AGRONOMIST
                  (Context-Aware Chat + Vision Leaf Diagnosis)
                                    │
                                    ▼
         100% MIDDLEMAN (ARHTIYA) REMOVAL & 5-CHANNEL MARKETPLACE
         ├── Channel 1: Govt FCI MSP Mandi Terminal (12-Digit Passcode, Iris Scan, Direct DBT)
         ├── Channel 2: Direct Farm-Gate Wholesale Desk (Counter-Offers, Escrow, 11-Lang Chat)
         ├── Channel 3: APEDA International Export Gateway (FOB Arbitrage, Container Pooling)
         ├── Channel 4: Cooperative FPO Group Aggregation (30-45% Transport Savings)
         └── Channel 5: CACP Statutory MSP Price Floor Guarantee (Anti-Predatory Bidding)
```

---

## 1.1 🏛️ Government-to-Farmer Middleman Removal Architecture

AgriProfit includes a dedicated, production-grade direct procurement subsystem eliminating commission agents (*arhtiyas*):
1. **Farmer Sends Application (`/marketplace/msp`):** Farmer reserves delivery slot directly from mobile, bound to their registered PostGIS land polygon.
2. **Govt Official Reviews & Approves (`/marketplace/government`):** Official Mandi Procurement Terminal validates crop yield quota against land records.
3. **12-Digit Passcode Generated:** System issues a single-use, unforgeable numeric authorization code (e.g. `9481 0274 5519`).
4. **Fast-Track Mandi Gate Access:** Farmer arrives at Mandi gate with tractor and enters code, bypassing middleman holding yards and cartel queues.
5. **UIDAI Iris Biometric Authentication:** On-site biometric eye scan confirms genuine farmer identity, preventing proxy sellers and ghost quota claims.
6. **Automated Weighbridge & Moisture Assay:** Gross and tare weights captured digitally; transparent FCI $<12\%$ moisture formula applied with zero subjective broker cuts.
7. **100% Direct Benefit Transfer (DBT / PFMS):** 100% MSP payout sanctioned directly to farmer's bank account in 24–48 hours (0% broker commission).
8. **National Digital Procurement Receipt:** Immutable downloadable receipt with Treasury Tx ID, QR code, and official government stamp.

---

## 1.2 🗓️ Seasonal, Interim (Zaid) & Festival-Timed Crop Intelligence Engine

AgriProfit addresses the multi-season nature of Indian agriculture (Kharif, Rabi, Zaid) and the 60–90 day summer fallow window:
1. **5 Planning Modes:** `short_duration` (25–75 day fast crops), `festival_season` (targeted festive market arrivals), `interim_crop` (catch crops between Rabi harvest and Kharif sowing), `quick_income` (emergency liquidity), and `custom_deadline` (strict days-remaining filter).
2. **Indian Festival Demand Signals:** Models 8 national festival demand surges (Diwali, Chhath Puja, Makar Sankranti, Holi, Baisakhi, Eid, Navratri, Janmashtami) with 1.20x–1.45x price multipliers.
3. **10-Step Evaluator:** Evaluates agro-climatic zone, sowing calendar, crop duration fit, Open-Meteo weather risks, soil health, water budget, MSP safety net, festive surge, financial ROI, and 0–100 explainable score.
4. **PostGIS Field Allocation:** Farmers can dynamically allocate sub-plots to seasonal catch crops via `SeasonalCropPlanningPanel.tsx`.

---

## 2. Component Topology

### A. Frontend Layer (`frontend/`)
* **Framework:** Next.js 16 (React 19, TypeScript, Tailwind CSS).
* **Core Modules:**
  * Geospatial Boundary Tool (`FarmMapPicker.tsx` with Google Maps / Leaflet fallback).
  * 4-Part Strategic Allocation Tuner (`RecommendationDashboard.tsx`).
  * 90-Day Climate Outlook (`/weather`).
  * APMC Mandi Watch & Price Spreads (`/markets`).
  * Multimodal AI Agronomist Chat (`/assistant`).

### B. Machine Learning Inference Layer (`ml-service/` & `ml/`)
* **Framework:** Python 3.11+ / FastAPI microservice on port 8000.
* **Models:**
  * `yield_model.pkl`: RandomForestRegressor trained on ICAR rainfall, temperature, and soil NPK data ($R^2 = 0.94$).
  * `price_model.pkl`: Ridge + GradientBoostingRegressor ensemble trained on 19,500 APMC time-series rows ($\text{MAPE} = 6.8\%$).

### C. Geospatial & Database Layer (`database/`)
* **Database:** PostgreSQL 16 with PostGIS extension.
* **Storage:** Spatial `GEOGRAPHY(POLYGON, 4326)` boundaries, `GEOGRAPHY(POINT, 4326)` centroids, real-time weather cache, and user preferences.

### D. Reverse Proxy & Infrastructure (`infrastructure/` & `nginx.conf`)
* **Nginx:** Routes `/` to Next.js (`:3000`) and `/ml/` to FastAPI (`:8000`).
* **Docker Compose:** Multi-container orchestration (`docker-compose.prod.yml`).

---

## 3. Secondary Marketplace & Direct Farm-to-Market Module

### A. Dual Channels
1. **Mode A — MSP Government Procurement:**
   - Farmer connects with verified Government Procurement Officers (FCI, PUNGRAIN, HAFED, NAFED).
   - Price locked automatically from CACP statutory dataset (`OFFICIAL_MSP_CATALOG`).
   - Generates cryptographically secure 12-digit numeric one-time transaction code.
   - Verified on-site at procurement terminal using 12-digit code + Biometric Verification Adapter (`DemoBiometricProvider`).
   - Weighed quantity determines final realization (`Actual Weight × Locked MSP`).
   - Generates tamper-evident digital receipt and demo DBT/PFMS payment record.
2. **Mode B — Direct Farm-to-Market & Group Selling:**
   - Farmer lists crop produce independently with custom asking price and quality grade.
   - Price intelligence engine displays transparent comparison against MSP floor, APMC mandi modal, and ML forecasted price.
   - Private wholesale buyers negotiate via platform-mediated counter-offers and multi-item Request Baskets.
   - Group Selling aggregates smallholder yields (e.g. 12q + 18q + 15q = 45q) with explainable compatibility scoring (0-100).
3. **Export Gateway:**
   - Farmers/Groups connect to registered Indian Exporters (not foreign buyers directly).
   - International reference prices from FAOSTAT / UN Comtrade across 10 destination countries.
   - Transparent cost calculation: `International Price - Logistics - Exporter Margin = Net Realization`.

### B. Biometric Verification Adapter Architecture
- Interface: `IBiometricProvider` with methods `verify()`, `getProviderReference()`, `getVerificationStatus()`.
- Implementation: `DemoBiometricProvider` (UIDAI Iris Emulation v1.2).
- Privacy: Never captures or stores raw iris scans, templates, or images. Only records cryptographic reference IDs, timestamps, and verification status. Clearly labeled as "Biometric Verification — Demo".

---

## 4. Profitability Decision Architecture

The marketplace-to-profitability path reuses existing farm, crop, weather, MSP,
market, and ML services. The deterministic cost engine normalizes units and
combines fixed, variable, production, transport, logistics, handling, and export
costs. The break-even engine calculates the price and quantity needed to cover
those costs. The scenario engine compares MSP, direct market, group selling, and
export outcomes, including price, yield, and cost sensitivity.

Recommendations rank calculated scenario profit and explain realization, cost,
demand, break-even, and risk factors. ML output, rule-based scoring,
deterministic calculations, and external data are labeled separately. Failed or
malformed ML responses produce an explicit unavailable signal, never a fabricated
prediction.

---

## 5. Model Registry and Transparency

The FastAPI service exposes model versions and valid evaluation metrics through
`/health` and `/models/info`. Model metadata includes type, version, purpose,
source/artifact information, and evaluation results. Predictions and actual
outcomes are stored separately. New observations do not automatically retrain or
improve a deployed model; future retraining requires governed export, LIVE/DEMO
filtering, quality checks, time-based evaluation, approval, version registration,
and controlled deployment.

---

## 6. Marketplace Economics

Group economics models pooled quantity, buyer demand, shared transport savings,
aggregation/handling/storage costs, realization, break-even, profit, and farmer
outcomes. Export economics models international reference data, trade period,
currency conversion, exporter offer, logistics, documentation, transport,
indicative realization, break-even, profit, and execution risk. External inputs
must expose source and freshness or reference-period metadata.

---

## 7. Security, Privacy, and Demo Limits

Private APIs authenticate sessions, authorize roles, and validate farm ownership.
Admin views expose aggregate telemetry only. CSV exports pseudonymize farmer/farm
references and remove phone numbers, credentials, tokens, OTPs, biometrics, and
government identifiers. Several demo paths use synthetic or benchmark values;
they are not guaranteed bids, procurement outcomes, live quotes, or evidence of
production model improvement.
