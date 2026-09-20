# AgriProfit — AI-Powered Smart Agriculture & 5-Channel Marketplace Platform

> **Smart India Hackathon (SIH 2026) · Round 2 Production Implementation**  
> A unified, production-grade agricultural decision-support and commodity monetization platform. AgriProfit empowers Indian farmers to plan, optimize, and directly trade their harvest by combining **spatial PostGIS field mapping**, **live Open-Meteo agro-meteorology**, **APMC mandi market rates**, **CACP Minimum Support Price (MSP) benchmarks**, **Python FastAPI ML yield, price, and fertilizer engines**, **a 5-channel transparent marketplace**, and **Unnati AI (उन्नति AI)** — an omnipresent multimodal, multilingual agronomist assistant powered by Google Gemini 2.5 Flash.

---

## 🌟 Executive Summary & Current Capabilities

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   AGRIPROFIT UNIFIED ECOSYSTEM                                   │
├──────────────────────────────────┬─────────────────────────────────┬─────────────────────────────┤
│ 🌾 4 Government Pillars          │ 🛒 5-Channel Marketplace        │ 🤖 Unnati AI Assistant      │
│   1. Farm Services (GIS/Soil)    │   1. Govt FCI/MSP Mandi Gate    │   • Google Gemini 2.5 Flash │
│   2. Crop Services (Wizard)      │   2. Direct Farm-Gate Wholesale │   • Vernacular Voice STT/TTS│
│   3. Market Services (APMC/MSP)  │   3. APEDA Global Export Desk   │   • System Photo Upload & CV│
│   4. Reports & Records (SHC/PDF) │   4. FPO Group Aggregation      │   • Draggable & Resizable UI│
│                                  │   5. CACP MSP Floor Guarantee   │   • 4 Dedicated Persona Desks
├──────────────────────────────────┴─────────────────────────────────┴─────────────────────────────┤
│ 🇮🇳 11 Indian Languages · 💻💻 Dual-Laptop Live SIH Demo Mode · ⚡ 1-Click Fast Instant Login       │
│ 🧠 RF Yield Model (R²=0.9601) · 📈 Ridge+GBR Price Forecaster (R²=0.9733) · 🧪 Soil NPK Engine    │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

- **4 Structured Government Service Pillars:** Farm Services, Crop Services, Market Services, and Official Reports & Records formatted to digital public infrastructure standards.
- **5-Channel Transparent Marketplace:** Direct trade, FCI official MSP procurement with 12-digit gate passcodes & biometric DBT disbursal, APEDA export gateway, and FPO group pooling.
- **Unnati AI (उन्नति AI) Assistant:** Draggable, 8-direction resizable floating popup assistant powered by Google Gemini 2.5 Flash (`gemini-2.5-flash`), with system file photo picker, drag-and-drop, clipboard paste, vernacular voice recognition, Hindi/English speech synthesis, and leaf disease diagnosis.
- **4-Part Hedged Portfolio Optimizer:** Modern Portfolio Theory (MPT / Markowitz) applied to agriculture, dynamically splitting land between Primary High-Profit, Low-Risk Hedged (MSP), Fast Cash, and Climate-Resilient Legume crops.
- **Dual-Laptop Live Demonstration System:** Seamless multi-workstation flow (Laptop 1: Farmer produces & registers harvest; Laptop 2: FCI Officer scans biometric & disburses funds).
- **1-Click Instant Persona Logins:** Pre-configured profiles for Farmers (Ramesh Kumar), FCI Mandi Officers (Officer S. Sharma), APEDA Exporters, and Agribusiness Buyers with zero SMS or password friction.
- **Robust Multi-Device LAN Compatibility:** Guests see a clear `🔐 Sign in` button; authenticated users see their profile and an instant `Sign out` button; visiting `/login` is never blocked or redirected.
- **Vernacular & Accessible:** Supports 11 Indian languages, screen reader page narrator, high-contrast mode, eye-care filter, and adjustable text scaling.
- **Machine Learning & Telemetry:** Python FastAPI microservice delivering Random Forest Crop Yield predictions ($R^2 = 0.9601$), Ensemble Mandi Price forecasts ($R^2 = 0.9733$), and Soil Fertilizer rebalancing.

---

## 1. Vision & Problem Statement

### The Problem
Over 85% of Indian farmers are smallholders operating on intuition, word-of-mouth, or last season's prices. This causes:
1. **Cobweb Glut-and-Crash Cycles:** Over-cultivation of single popular crops leading to catastrophic post-harvest price collapses.
2. **Asymmetric Market Intermediation:** Farmers receiving only 30–40% of consumer end-prices due to multi-tiered middleman markups (*arhtiyas*).
3. **MSP Procurement Hurdles:** Farmers traveling long distances to mandis only to face arbitrary moisture rejections or delayed payments.
4. **Export Inaccessibility:** Inability for small farmers to tap into high-margin global demand due to quality grading and minimum volume thresholds.

### The AgriProfit Solution
AgriProfit connects the entire agricultural lifecycle into a single closed loop:  
**Spatial Land Mapping → Agro-Climatic Suitability → 4-Part Portfolio Optimization → Real-Time Crop Management → 5-Channel Direct Monetization.**

---

## 2. Platform Architecture: The 4 Core Service Pillars

The user experience is structured into four primary service pillars accessible from the main dashboard:

```text
                               ┌───────────────────────────┐
                               │   AgriProfit Dashboard    │
                               └─────────────┬─────────────┘
             ┌───────────────────────┬───────┴───────┬───────────────────────┐
             ▼                       ▼               ▼                       ▼
   ┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐
   │ 1. Farm Services  │   │ 2. Crop Services  │   │3. Market Services │   │4. Reports/Records │
   │ • Polygon GIS Map │   │ • Planning Wizard │   │ • APMC Daily Rates│   │ • Cadastral Plan  │
   │ • 3-Layer Soil HC │   │ • Crop Comparison │   │ • CACP MSP Catalog│   │ • Soil Health Card│
   │ • NPK Calculator  │   │ • 4-Crop Portfolio│   │ • NCDEX Futures   │   │ • 120-Day Roadmap │
   │ • Live Weather    │   │ • Zaid Quick-Crops│   │ • 5-Channel E-Mkt │   │ • Govt Schemes    │
   └───────────────────┘   └───────────────────┘   └───────────────────┘   └───────────────────┘
```

### Pillar 1: Farm Services (`/farm`)
- **Interactive Land Mapping:** GPS pinpointing and polygon drawing on Google Maps with real-time geodesic area calculation in acres and hectares.
- **3-Layer Soil Health Card (`/farm/soil`):** Complete analysis of primary macronutrients (N, P, K), secondary micronutrients (Zn, Fe, B, S), and physical soil health (pH, EC, Organic Carbon).
- **Fertilizer Rebalancing Engine:** Automated calculation of exact Urea, DAP, and MOP requirements per acre based on ICAR STCR equations to reduce input waste.
- **Live Agro-Meteorology (`/weather`):** 7-day temperature, rainfall, and spray window forecasts via Open-Meteo, cross-referenced with regional IMD baselines.

### Pillar 2: Crop Services (`/crop-services`)
- **Progressive Planning Wizard (`/crop-services/planning`):** Tailors crop recommendations based on soil type, water source (canal, borewell, drip, rainfed), and risk appetite.
- **4-Part Hedged Portfolio Optimizer:** Evaluates crops across 5 data dimensions and partitions acreage into 4 functional quadrants (Primary High Profit, Low-Risk Hedged, Fast Cash, Climate Resilient).
- **Pairwise Crop Comparison (`/crop-services/compare`):** Side-by-side agronomic and financial trade-off matrix.
- **ICAR Crop Library (`/crops`):** Curated database of 40+ crops with package-of-practices, sowing depths, and disease resistances.

### Pillar 3: Market Services & 5-Channel Marketplace (`/market-services`, `/marketplace`)
- **APMC Mandi Watch (`/markets`):** Daily modal prices, arrivals, and 30-day volatility across national mandis.
- **CACP MSP Floor Catalog (`/market-services/msp`):** Statutory floor prices with historical growth rates.
- **NCDEX Commodity Curves (`/market-services/ncdex`):** Forward futures contracts indicating harvest-season price expectations.
- **5-Channel Digital Marketplace:** Detailed below.

### Pillar 4: Reports & Records (`/reports`)
- **Cadastral Land Dossier (`/reports/farm`):** Official PDF-ready land record documenting GPS vertices, soil profile, and crop history.
- **Soil Health Card Dossier (`/reports/soil`):** Printable nutrient scorecards with color-coded diagnostic ratings.
- **Seasonal Action Roadmap (`/recommendations/plan`):** 120-day chronological operational checklist from tilling to post-harvest storage.
- **Government Welfare Schemes (`/schemes`):** Direct eligibility scanner for PM-KISAN, PMFBY crop insurance, Kisan Credit Card (KCC), and Agriculture Infrastructure Fund (AIF).

---

## 3. The 4-Part Hedged Land Allocation Engine

Instead of mono-cropping, AgriProfit applies **Modern Portfolio Theory (Markowitz Mean-Variance Adaptation)** to Indian agriculture ([`portfolio-optimizer.ts`](frontend/src/lib/portfolio-optimizer.ts)).

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        4-PART STRATEGIC LAND ALLOCATION MODEL                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Primary (High Profit) [35% – 40% of Total Acreage]                                  │
│    • Maximizes commercial upside and gross margin during peak market windows.          │
│    • Fitness Index: OpportunityUtility = (NetProfit / 1500 * 0.60) + (MarketScore * 0.40)│
│    • Example: Garlic, Potato, Onion, Basmati Rice, Mustard                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. Hedged (Low Risk) [25% – 35% of Total Acreage]                                      │
│    • Downside capital protection backed by statutory Government MSP floor procurement. │
│    • Guarantees enough revenue to repay 100% of seasonal bank loans & input debts.    │
│    • Fitness Index: SafetyUtility = (MSPScore * 0.55) + (Weather * 0.25) + (Soil * 0.20) │
│    • Example: Wheat, Maize, Paddy, Cotton, Soybean                                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. Fast Cash Crop [20% – 30% of Total Acreage]                                         │
│    • Short-duration crop (60–90 days) providing quick liquidity for working capital.   │
│    • High daily APMC mandi volume and consistent local demand.                         │
│    • Fitness Index: StabilityUtility = (Profit * 0.40) + (Market * 0.35) + (Weather * 0.25)│
│    • Example: Green Gram (Moong), Black Gram (Urad), Seasonal Vegetables              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. Climate Resilient [15% – 20% of Total Acreage]                                      │
│    • Drought-hardy leguminous crop with low water requirement (<350mm).                │
│    • Root nodules fix atmospheric nitrogen, restoring soil organic carbon (SOC) and    │
│      reducing chemical Urea expenditure for subsequent seasons by 20–30%.              │
│    • Fitness Index: DiversityUtility = PulseBonus(45) + (Soil * 0.35) + (Weather * 0.20)│
│    • Example: Chickpea (Chana), Lentil (Masoor), Pigeon Pea (Arhar)                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Dynamic Risk Profile Splits

| Risk Appetite | Primary (Profit) | Hedged (MSP) | Fast Cash | Climate Resilient | Strategic Rationale |
|---|:---:|:---:|:---:|:---:|---|
| **Balanced (Default)** | **40%** | **25%** | **20%** | **15%** | Optimal tradeoff: Captures upside while locking in debt safety and soil health. |
| **Conservative** | **15%** | **50%** | **25%** | **10%** | Capital preservation: 50% locked into guaranteed MSP to shield vulnerable smallholders. |
| **Growth** | **35%** | **20%** | **25%** | **20%** | Profit maximization: Commercial growers capture high-margin export/cash crops. |

### 7-Scenario Monte Carlo Stress Testing Matrix
Every generated portfolio is automatically evaluated against 7 disruptions:
1. **Normal Baseline** (1.0x Rev / 1.0x Cost)
2. **Monsoon Deficit (-30% Rain)** (0.82x Rev / 1.05x Cost)
3. **Excess Rain / Waterlogging (+40% Rain)** (0.88x Rev / 1.08x Cost)
4. **Late-Season Heatwave (+3°C)** (0.85x Rev / 1.02x Cost)
5. **Mandi Price Correction (-20% Price)** (0.80x Rev / 1.00x Cost)
6. **Severe Mandi Price Crash (-30% Price)** (0.70x Rev / 1.00x Cost)
7. **Input Cost Inflation (+20% Fertilizer/Labor)** (1.00x Rev / 1.20x Cost)

---

## 4. The 5-Channel Unified Agri-Marketplace

AgriProfit's marketplace eliminates exploitative middlemen by offering five distinct channels tailored to different buyer and seller personas:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        5-CHANNEL UNIFIED AGRI-MARKETPLACE                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Channel 1: Official MSP Procurement Gateway (/marketplace/government)                 │
│   • 12-digit Mandi gate passcodes for guaranteed queue priority                        │
│   • Automated weighbridge gross/tare capture & moisture deductions (<12% FCI benchmark)│
│   • Simulated Aadhaar biometric iris authentication & direct DBT payment settlement    │
│   • Formal FCI/NAFED downloadable procurement receipts                                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Channel 2: Direct Farm-Gate Wholesale Desk (/marketplace/direct)                       │
│   • Direct catalog listings with live price-positioning vs MSP floor                   │
│   • Bilateral counter-offer engine with buyer escrow protection                        │
│   • Dynamic bulk request basket with farm-gate freight estimates                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Channel 3: International Agri-Export Gateway (/marketplace/export)                     │
│   • 10-country international demand signals (UAE, Saudi Arabia, EU, USA, ASEAN)       │
│   • Free-On-Board (FOB) price arbitrage vs Indian domestic mandi prices                │
│   • Itemized export cost waterfall (APEDA cess, phytosanitary lab test, cold chain)    │
│   • Farmer Cooperative Container Pooling to meet 20ft/40ft reefer thresholds           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Channel 4: Cooperative & FPO Group Selling (/marketplace/groups)                       │
│   • Smallholders aggregate identical crops to unlock wholesale transport rates         │
│   • Transparent pro-rata revenue distribution based on weight and moisture grade       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Channel 5: CACP Statutory MSP Safety Net Guarantee (/market-services/msp)              │
│   • Hardcoded price floor: platform warns and blocks predatory below-MSP bidding        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Unnati AI (उन्नति AI) — Multimodal Assistant

**Unnati AI** is a persistent, interactive assistant mounted across every page of the application:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                      Unnati AI Assistant Window                         │
├─────────────────────────────────────────────────────────────────────────┤
│ [🌾 Farmer] [🏛️ Govt Officer] [🚢 APEDA Exporter] [🛒 Buyer]           │
│                                                                         │
│ 🤖 "नमस्ते रमेश जी! आपके खेत में 2.5 एकड़ गेहूं के लिए 120 दिन का     │
│    एक्शन प्लान तैयार है। क्या आप मंडी भाव या खाद की मात्रा जानना चाहते  │
│    हैं?"                                                               │
│                                                                         │
│ 📸 Leaf Disease Vision Scan: Puccinia striiformis (Wheat Yellow Rust)    │
│    Confidence: 94.8% · Treatment: Propiconazole 25% EC @ 1ml/L          │
│                                                                         │
│ [📁 Add Photo] [🧪 Samples] [🎤 Speak Hindi/English] [💬 Send]          │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Universal Intelligence:** Direct integration with Google Gemini 2.5 Flash (`gemini-2.5-flash`), answering questions across agronomy, market trading, government regulations, and science.
- **Movable & Resizable UI:** Freely draggable header and 8-point resize handles (all four borders and corners) plus one-click maximize/minimize.
- **Multimodal Computer Vision Image Upload:**
  - **`📁 Add Photo` Button:** Opens native device/system file picker (`.png`, `.jpg`, `.jpeg`, `.webp`, `.heic`).
  - **Drag-and-Drop:** Drop leaf images directly onto the window with an animated drop overlay.
  - **Clipboard Paste:** Press `Ctrl + V` in the input field to attach screenshots.
  - **`🧪 Samples` Drawer:** 1-click diagnostic leaf presets (Wheat Yellow Rust, Potato Late Blight, Nitrogen Chlorosis) plus a `+ Choose from Computer` button.
- **4 Dedicated Persona Desks:**
  - *🌾 Farmer Desk:* Sowing schedules, soil nutrition, spray windows, 12-digit MSP tokens.
  - *🏛️ Govt Officer Persona:* Mandi intake protocols, moisture deduction rules, weighbridge formulas, DBT sanctions.
  - *🚢 Exporter Persona:* APEDA export standards, phytosanitary compliance, international container FOB pricing.
  - *🛒 Buyer Persona:* Farm-gate sourcing contracts, quality parameters, bulk discount analysis.
- **Voice-Enabled:** Vernacular Hindi/Indian English Speech-to-Text (STT) and text-to-speech (`🔊 सुनिए`) audio playback.

---

## 6. Machine Learning Architecture & Models

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               AGRIPROFIT AI ENGINE                                     │
├──────────────────────────────────┬─────────────────────────────────────────────────────┤
│ 1. Unnati AI Multimodal Core     │ Google Gemini 2.5 Flash (Direct API / OpenRouter)   │
│    (Contextual Agronomy & Vision)│ • Computer Vision Leaf Pathology                   │
│                                  │ • Natural Language Understanding (11 Languages)     │
│                                  │ • Role-Specific Business Logic Adapter              │
├──────────────────────────────────┼─────────────────────────────────────────────────────┤
│ 2. Crop Yield Predictor          │ RandomForestRegressor (v2.0)                        │
│    (Trained on 7,000+ ICAR rows) │ • Test R²: 0.9601 | MAE: 683.3 kg/ha                │
│                                  │ • Features: Rainfall, Temp, Soil NPK, Area, Season  │
│                                  │ • Explainable Feature Importance (61.8% Genetics)   │
├──────────────────────────────────┼─────────────────────────────────────────────────────┤
│ 3. APMC Mandi Price Forecaster   │ Ensemble: Ridge Regression + GradientBoosting       │
│    (19,500 APMC time-series)     │ • Test R²: 0.9733 | MAPE: 3.79%                     │
│                                  │ • Features: Modal price lag, Mandi arrivals, MSP    │
├──────────────────────────────────┼─────────────────────────────────────────────────────┤
│ 4. Soil Fertilizer & Nutrients   │ Random Forest Classifier & Multi-Output Regressor   │
│    (STCR Calibration)            │ • Outputs exact Urea, DAP, MOP, SSP, Zinc dosages   │
├──────────────────────────────────┼─────────────────────────────────────────────────────┤
│ 5. Deterministic Hedging Engine  │ 4-Factor Mathematical Constraint Knapsack Solver   │
│    (Agro-Economic Optimization)  │ • Maximizes portfolio return subject to risk caps   │
└──────────────────────────────────┴─────────────────────────────────────────────────────┘
```

### Why Random Forest Regressor v2.0 for Crop Yield?
- **Non-Linear Biological Curves:** Crop yields do not scale monotonically. Temperature follows an inverted-U curve (Wheat thrives at 15–22°C, but terminal heat stress crashes yields above 28°C). Linear models fail here ($R^2 < 0.74$).
- **Outlier Robustness:** Random Forest bags 100 decorrelated trees in parallel, making it highly resistant to extreme agricultural weather anomalies and survey noise compared to boosting models.
- **Zero Black-Box Guesswork:** Provides ICAR-auditable Gini feature importances: Crop Genetics (61.82%), Temperature Window (32.10%), Rainfall & Moisture (3.43%), Irrigation Type (1.62%), Soil pH (0.56%), Nitrogen (0.24%).

---

## 7. Complete API Catalog

### Python FastAPI ML Microservice (Port `8000`)

| Method | Endpoint | ML Model / Engine | Description |
|:---:|---|---|---|
| `GET` | `/health` | Service Telemetry | Microservice uptime, memory, and model artifact status. |
| `POST` | `/predict/yield` | **Random Forest Regressor v2.0** | Predicts crop yield in Quintals/Acre from climate, soil, and irrigation data. |
| `POST` | `/predict/price` | **Ridge + GBR Ensemble v2.0** | Forecasts APMC mandi harvest modal prices (₹/q) 3–6 months ahead. |
| `POST` | `/predict/fertilizer` | **RF Multi-Output Classifier & Regressor** | Computes deficiency class and optimal Urea, DAP, MOP, and Zinc dosages. |

### Next.js Platform REST APIs (Port `3000`)

- **🔐 Auth (`/api/auth/`):** `send-otp`, `verify-otp`, `portal-login`, `me` (GET/PATCH), `logout` (with instant cookie purge `expires: 0`).
- **🤖 Assistant (`/api/assistant/`):** Routes user prompts and Base64 leaf photos to Google Gemini 2.5 Flash with live farm telemetry.
- **🗺️ Farms & Soil (`/api/farms/`):** Polygon boundaries, 3-layer soil profiles, fertilizer rebalancing schedules, and lab test verification.
- **🌾 Recommendations (`/api/recommendations/`):** 4-part portfolio optimizer, seasonal Kharif/Rabi/Zaid planning, pairwise comparison, and profitability models.
- **📈 Markets & MSP (`/api/markets/`, `/api/msp/`):** Daily APMC mandi arrivals, commodity trends, and CACP statutory MSP catalog.
- **🛒 Marketplace (`/api/marketplace/`):** Direct listings, counter-offers, FPO groups, 12-digit MSP tokens, biometric verification, export matching, and digital escrow transactions.
- **🌐 Localization & Weather (`/api/translation/`, `/api/weather/`):** Multilingual batch translation across 11 languages, Open-Meteo agro-weather forecasts.
- **⚙️ Health (`/api/health/`, `/api/admin/metrics`):** Full system heartbeat and database pool latency monitoring.

---

## 8. Dual-Laptop SIH Live Demonstration Mode

AgriProfit includes a dedicated dual-laptop demonstration architecture built for Smart India Hackathon jury presentations:

```text
┌──────────────────────────────────────┐       ┌──────────────────────────────────────┐
│        LAPTOP 1: KISAN WORKSTATION   │       │     LAPTOP 2: OFFICIAL MANDI TERMINAL │
│         (http://<LAN_IP>:3000)       │       │         (http://<LAN_IP>:3000)       │
├──────────────────────────────────────┤       ├──────────────────────────────────────┤
│ 1. 1-Click Login: Ramesh Kumar (Kisan)│       │ 1. 1-Click Login: Officer S. Sharma  │
│ 2. Map farm polygon & inspect soil   │       │ 2. Mandi Terminal reviews queue      │
│ 3. Submit 50 Qtl Wheat for Govt MSP  │ ────► │ 3. Inputs 12-digit code: FCI-PB-9941 │
│ 4. Receive 12-Digit Passcode         │       │ 4. Weighbridge tare & 12% moisture   │
│ 5. Notification: "DBT Disbursed!"    │ ◄──── │ 5. Biometric scan & instant DBT pay  │
└──────────────────────────────────────┘       └──────────────────────────────────────┘
```

### 1-Click Instant Demo Profiles
The login screen (`/login`) features a top-level quick-access bar with pre-configured sessions that require **zero passwords or OTPs**:
- 🌾 **Kisan Farmer:** Ramesh Kumar (`9876543210` / Karnal, Haryana)
- 🏛️ **Govt FCI Officer:** Officer S. Sharma (`FCI-PB-994` / Ludhiana, Punjab)
- 🚢 **APEDA Exporter:** Sun Agri Exports (`IEC-0519928341` / Delhi & Nhava Sheva)
- 🛒 **Private Buyer:** AgroCorp Sourcing Desk (`9876500003` / Delhi NCR)

---

## 9. Monorepo Project Structure

```text
SIH-ROUND-2/
├── frontend/                         # Next.js 16 (Turbopack) + React 19 + TypeScript
│   ├── src/
│   │   ├── app/                      # App Router (93 compiled routes & API endpoints)
│   │   │   ├── page.tsx              # Unified Government Service Pillars Homepage
│   │   │   ├── login/                # 1-Click Persona Login, Active Session Bar & OTP Auth
│   │   │   ├── farm/                 # Farm Services & 3-Layer Soil Health
│   │   │   ├── crop-services/        # Planning Wizard & 4-Part Portfolio Optimizer
│   │   │   ├── market-services/      # APMC Mandi, MSP Catalog & NCDEX Curves
│   │   │   ├── marketplace/          # 5-Channel Unified Digital Marketplace
│   │   │   │   ├── direct/           # Channel 2: Direct Farm-Gate Wholesale Desk
│   │   │   │   ├── government/       # Channel 1: FCI Mandi Gate Procurement
│   │   │   │   ├── export/           # Channel 3: APEDA Global Export Desk
│   │   │   │   └── groups/           # Channel 4: FPO Group Sourcing Desk
│   │   │   ├── reports/              # Official Cadastral & Soil Dossiers
│   │   │   ├── schemes/              # PM-KISAN, PMFBY & Welfare Scheme Matcher
│   │   │   ├── assistant/            # Dedicated Full-Page Unnati AI View
│   │   │   ├── weather/              # 7-Day Live Forecast & Climate Baselines
│   │   │   └── api/                  # 56 Backend REST API Routes
│   │   ├── components/               # AppShell, UnnatiAIPopup, PageAudioTranslator, etc.
│   │   └── lib/                      # Repositories, geo-service, portfolio-optimizer, auth
│   └── package.json                  # Next.js 16.3.2, Tailwind v4, Google Maps Loader
│
├── ml-service/                       # Python 3.11+ / FastAPI Machine Learning Engine
│   ├── app/                          # FastAPI application & endpoints
│   │   ├── api/routes/               # /predict/yield, /predict/price, /predict/fertilizer
│   │   └── models/                   # RF Yield Model, Ridge+GBR Price, Fertilizer RF
│   ├── models_artifacts/             # Serialized pickle/joblib binaries & report JSONs
│   ├── requirements.txt              # FastAPI, scikit-learn, numpy, pandas, uvicorn
│   └── Dockerfile                    # Container definition for ML service
│
├── data/                             # Curated Agricultural Datasets
│   ├── raw/                          # Raw Agmarknet, ICAR, and IMD historical records
│   ├── processed/                    # Feature-engineered training datasets
│   └── reference/                    # CACP MSP schedules and state/district geo-data
│
├── tests/                            # Automated Verification Test Suites
│   ├── test_unnati_gemini.ts         # Live Google Gemini 2.5 Flash API validation
│   ├── test_farms.ts                 # Spatial farm creation & boundary validation
│   ├── test_marketplace.ts           # 5-channel transaction & counter-offer tests
│   └── integration/                  # End-to-end integration tests
│
└── README.md                         # Complete project documentation
```

---

## 10. Installation & Quick Start

### Prerequisites
- **Node.js:** `v20.x` or `v22.x`
- **Python:** `3.10+` or `3.11+`
- **Package Manager:** `npm`

### 1. Clone & Configure Environment

```bash
git clone https://github.com/granth-alpha2/SIH-ROUND-2.git
cd SIH-ROUND-2

# Configure frontend environment
cp frontend/.env.example frontend/.env.local
```

Ensure `frontend/.env.local` includes your API keys:
```env
# Gemini API Key for Unnati AI (Tested with gemini-2.5-flash)
GEMINI_API_KEY=your_gemini_api_key_here

# Google Maps JavaScript API (for spatial farm mapping)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key_here

# JWT Authentication Secret
JWT_SECRET=your_super_secret_jwt_key_here
SESSION_COOKIE_NAME=agriprofit_session
```

### 2. Launch FastAPI ML Microservice

```bash
# In terminal 1:
cd ml-service
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```
* ML API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Build & Run Frontend (Production Server)

```bash
# In terminal 2:
cd frontend
npm install
npm run build
npm run start -- -H 0.0.0.0 -p 3000
```
* **Local Access:** [http://localhost:3000](http://localhost:3000)
* **Local Network (LAN / Second Laptop):** `http://<YOUR_IP>:3000` (e.g. `http://172.21.249.202:3000`)

---

## 11. Multi-Device & Network Configuration

To run the application across multiple laptops during hackathon demonstrations:
1. Ensure both devices are connected to the same Wi-Fi or mobile hotspot.
2. The server binds to `0.0.0.0:3000` by default.
3. Check the host machine's IP address:
   ```powershell
   # On Windows PowerShell:
   ipconfig
   ```
4. On the second laptop or phone, open Chrome and navigate to:
   ```text
   http://<HOST_IP>:3000/login
   ```
5. Click **"🌾 Enter as Kisan Farmer"** on Laptop 1 and **"🏛️ Enter as Govt FCI Officer"** on Laptop 2 for a zero-friction bilateral demo.

---

## 12. Vernacular & Accessibility Standards

- **11 Language Locales:** Full UI translation dictionaries (English, Hindi, Punjabi, Gujarati, Marathi, Telugu, Bengali, Tamil, Kannada, Malayalam, Odia).
- **Audio Screen Narrator (`PageAudioTranslator`):** Automatically synthesizes clean spoken summaries of the active page in the user's chosen language.
- **Visual Accessibility:**
  - `Contrast`: Standard vs High-Contrast Black/Gold themes.
  - `Mode`: Day mode, Night mode, and Blue-Light EyeCare mode.
  - `Typography`: Adjustable font sizes (`sm`, `md`, `lg`, `xl`).

---

## 13. Security & Data Integrity

- **Non-Secure LAN Compatibility:** Cookies are configured with `SameSite=Lax`, `secure: false`, and explicit `expires: 0` on logout, ensuring sessions work reliably across plain HTTP local networks as well as HTTPS deployments.
- **Key Isolation:** Gemini and OpenRouter API keys are executed strictly server-side inside Next.js route handlers.
- **Protected Telemetry:** Data quality scores and system health checks are continuously monitored via `/api/admin/metrics`.

---

## 14. License & Hackathon Attribution

Developed for **Smart India Hackathon (SIH 2026)**.  
Repository: [granth-alpha2/SIH-ROUND-2](https://github.com/granth-alpha2/SIH-ROUND-2)  
Licensed under the [MIT License](LICENSE).
