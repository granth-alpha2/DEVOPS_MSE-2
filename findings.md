# AGRIPROFIT PATENT INVESTIGATION — FINDINGS

## STEP 6 — COMPREHENSIVE TECHNICAL AUDIT (CANDIDATES A, B, C, D, E)

**Repository:** `https://github.com/granth-alpha2/SIH-ROUND-2`  
**Branch investigated:** `main`  
**Investigation scope:** Source-code verification, runtime test execution, and Git lineage analysis. No prior-art search performed in this section.  
**Sole Inventor / Applicant:** Granth Chauhan  

### Evidence tags

* **VERIFIED** — directly supported by current source code and runtime artifacts.
* **NOT VERIFIED** — source code does not establish the claim; claim is absent or contradicted.
* **INFERENCE** — technical conclusion derived directly from verified code implementation.
* **REQUIRES INVENTOR CONFIRMATION** — cannot be established from the repository alone.
* **REQUIRES PATENT PROFESSIONAL REVIEW** — legal/patent conclusion requiring professional patent counsel.

---

# 1. INVESTIGATION LIMITATION & METHODOLOGY

**STATUS: VERIFIED LOCAL EXECUTION & GIT AUDIT**

This investigation was conducted directly on the local monorepo workspace (`c:\SIH ROUND 2`), including:
1. Direct line-by-line inspection of all TypeScript/React frontends, Next.js API route handlers, Python FastAPI microservices, and processed CSV datasets.
2. Direct execution of repository automated tests (`tsx scripts/test_market_recommendations_simulation.ts`) verifying runtime behavior.
3. Verification of full commit logs, author dates, and commit hashes via Git history.

No source code was modified during this audit.  
No prior-art search has yet been initiated.  
No formal patent claims are drafted here.

---

# 2. CANDIDATE A

# 4-PART RISK-STRATIFIED AGRICULTURAL PORTFOLIO OPTIMIZER (AGRICULTURAL MPT ADAPTATION)

## 2.1 Relevant files

### Primary Implementation
* `frontend/src/lib/portfolio-optimizer.ts` (Core client-side optimization logic & scoring)
* `frontend/src/app/recommendations/RecommendationDashboard.tsx` (Live UI consumption & interactive display)
* `frontend/src/app/crop-services/planning/page.tsx` (3-step planning wizard)
* `frontend/src/lib/simulation-engine.ts` (`simulateCropFinancials`)
* `frontend/src/lib/crop-data.ts` (`CROP_DATABASE`, 25 master crops)
* `frontend/src/lib/market-service.ts` (`MANDI_BENCHMARK_PRICES`)

---

## 2.2 Entry point & Execution Path

```text
RecommendationDashboard.tsx (React useMemo)
        │
        ▼
optimizePortfolio(input: PortfolioConstraintInput)
  ├── 1. Filter crops by season, exclusions, & water
  ├── 2. Multi-factor scoring (Weather, Soil, Market, MSP, Profit)
  ├── 3. Strategic role utility calculation (Safety, Stability, Opportunity, Diversity)
  ├── 4. Greedy top-1 pick per role
  ├── 5. Fixed percentage land allocation by risk appetite
  └── 6. 7-Scenario scalar stress matrix
```

**VERIFIED:** The engine executes purely client-side in browser memory. It is called directly by `RecommendationDashboard.tsx`. It does **not** call the Next.js API route `/api/recommendations` and does **not** call the Python FastAPI ML microservice.

---

## 2.3 Mathematical Formulation & Solvers

### Does it implement Modern Portfolio Theory (Markowitz Mean-Variance)?

**VERIFIED: NO**

* Zero covariance matrices ($\mathbf{\Sigma}$) are calculated or stored.
* Zero quadratic programming solvers (e.g. QP interior-point, active-set) exist in the codebase.
* Zero variance minimization or efficient frontier calculations are executed.

### Does it implement a Constrained Knapsack Solver?

**VERIFIED: NO**

* No dynamic programming, branch-and-bound, or integer linear programming (ILP) algorithm is present.
* The working capital budget cap (`budgetCapInr`) does **not** restrict or prune crop selection.
* `budgetConstraintSatisfied` merely checks whether `estimatedCost <= budgetCap * 1.1` after allocation has already occurred.
* `waterConstraintSatisfied` and `excludedCropsRespected` are hardcoded to boolean literal `true` in `constraintsChecked` (lines 827–828).

### How are crops selected and land allocated?

**VERIFIED: GREEDY TOP-1 SORT + FIXED STATIC PERCENTAGES**

1. **Role 1 (Safety Floor):** Selects crop with $\max(\text{safetyUtility})$ from eligible pool.
2. **Role 2 (Stability & Profit):** Selects crop with $\max(\text{stabilityUtility})$ from remaining pool.
3. **Role 3 (High-Profit Opportunity):** Selects crop with $\max(\text{opportunityUtility})$ from remaining pool.
4. **Role 4 (Intelligent Growth & Diversity):** Selects crop with $\max(\text{diversityUtility})$ from remaining pool.

Land is allocated via hardcoded static percentage splits:
* **Conservative:** Part 1 = 50%, Part 2 = 25%, Part 3 = 15%, Part 4 = 10%
* **Growth:** Part 1 = 20%, Part 2 = 25%, Part 3 = 35%, Part 4 = 20%
* **Balanced:** Part 1 = 35%, Part 2 = 30%, Part 3 = 20%, Part 4 = 15% *(Note: code uses 35/30/20/15; documentation claims 25/20/40/15)*

---

## 2.4 7-Scenario "Monte Carlo" Stress Testing

## Finding

**VERIFIED: DETERMINISTIC SCALAR MULTIPLICATION (NOT MONTE CARLO)**

`runScenarioSimulations()` (lines 179–272) defines an array of 7 fixed scenarios with deterministic scalar multipliers:
1. `normal`: $1.00 \times \text{Rev}, 1.00 \times \text{Cost}$
2. `deficit_rain`: $0.82 \times \text{Rev}, 1.05 \times \text{Cost}$
3. `excess_rain`: $0.88 \times \text{Rev}, 1.08 \times \text{Cost}$
4. `heatwave`: $0.85 \times \text{Rev}, 1.02 \times \text{Cost}$
5. `mandi_correction`: $0.80 \times \text{Rev}, 1.00 \times \text{Cost}$
6. `mandi_crash`: $0.70 \times \text{Rev}, 1.00 \times \text{Cost}$
7. `input_inflation`: $1.00 \times \text{Rev}, 1.20 \times \text{Cost}$

It computes:
```text
simRev = Math.round(baseRevenue * s.revMult);
simCost = Math.round(baseCost * s.costMult);
```
There is zero random sampling, zero probability distributions, and zero iterations.

---

## 2.5 Candidate A Overall Assessment

### Verified technical substance
A fully functioning, responsive client-side allocation engine that maps farm inputs to a 4-crop portfolio using systematic multi-factor scoring and risk-stratified land splits.

### Technically distinctive?
**NOT ESTABLISHED.**  
The 4 strategic roles represent a thoughtful agronomic taxonomy, but the mathematical implementation is an elementary greedy sort and static multiplication table. Under patent law (Indian Patent Act Section 3(k) / USPTO 35 U.S.C. § 101), heuristic scoring rules and fixed percentage splits are non-patentable abstract mental concepts and business rules.

---

# 3. CANDIDATE B

# ML-COUPLED MULTI-CROP RECOMMENDATION ENGINE (`recommendation-engine.ts` & ML BRIDGE)

## 3.1 Relevant files

* `frontend/src/lib/recommendation-engine.ts` (Server-side recommendation engine V1 & ML variant)
* `frontend/src/app/api/recommendations/route.ts` (Next.js REST API route handler)
* `frontend/src/lib/ml-client.ts` (HTTP client bridge to Python FastAPI service)
* `ml-service/app/models/yield_model.py` (FastAPI Random Forest yield model)
* `ml-service/app/models/price_model.py` (FastAPI Ridge + GradientBoostingRegressor price model)
* `data/README.md` (Dataset disclosure)

---

## 3.2 Production Path Disconnect (Orphaned Route)

## Finding

**VERIFIED: ORPHANED SERVER-SIDE ENGINE**

The server-side engine lives in `recommendation-engine.ts` and is exposed via `POST /api/recommendations`.  
However, **no user-facing frontend page calls `/api/recommendations`**.  
The dashboard (`RecommendationDashboard.tsx`) exclusively runs Candidate A (`portfolio-optimizer.ts`) client-side. The `/api/recommendations` route only appears in an administrative status list (`admin-service.ts`) and offline test scripts.

---

## 3.3 3-Crop Split vs 4-Part Architecture

## Finding

**VERIFIED: ALLOCATES TO 3 CROPS ONLY**

Unlike Candidate A, `recommendation-engine.ts` (lines 489, 600) executes:
```text
const topCrops = scoredCrops.slice(0, 3);
```
and applies a 3-way split:
* **Balanced:** 55% / 30% / 15%
* **Conservative:** 60% / 30% / 10%
* **Growth:** 45% / 35% / 20%

It completely omits the 4-part role framework (Safety, Stability, Opportunity, Diversity).

---

## 3.4 ML Microservice Coupling & The Inverted Algebraic Defect

## Finding

**VERIFIED: DEFECTIVE REVENUE CALCULATION**

`generateRecommendationsWithML()` successfully queries the FastAPI microservice (`POST http://localhost:8000/predict/yield`) for predicted yield per acre.  
However, when building financial allocations (lines 505–506 and 614–615), the code contains an algebraic substitution error:
```typescript
expectedYieldQuintalsPerAcre: crop.financials.revenuePerAcre / (crop.financials.revenuePerAcre / crop.financials.costPerAcre || 1)
```
Algebraically, $\frac{R}{R / C} = C$ (`costPerAcre`).  
Consequently, `expectedYieldQuintalsPerAcre` evaluates to `costPerAcre` (e.g. 25,000 q/ac instead of 15 q/ac). When passed to `simulateCropFinancials()`, this inflates gross revenue into hundreds of millions of rupees per acre.

---

## 3.5 Synthetic ML Training Foundation

## Finding

**VERIFIED: 100% SYNTHETIC DATA BASIS**

[`data/README.md`](file:///c:/SIH%20ROUND%202/data/README.md) lines 10–18 explicitly states:
> *"Everything in raw/, processed/, and ml/ is synthetic seed/development data... It is not a copy of Agmarknet, FAOSTAT, IMD, or any other real dataset."*

The reported ML benchmark metrics ($R^2=0.9601$ for Random Forest yield, $R^2=0.9733$ for Ridge/GBR price) are overfitted artifacts of mathematical generator scripts, not empirical agricultural validation.

---

## 3.6 Candidate B Overall Assessment

### Verified technical substance
A working FastAPI Python microservice connected via HTTP to a Next.js API route handler with try-catch fallback to ICAR benchmarks.

### Technically distinctive?
**NOT ESTABLISHED.**  
Standard Scikit-learn regressors applied to synthetic tabular data. The production pipeline is disconnected from the user dashboard, and the server-side revenue calculation contains a critical algebraic flaw.

---

# 4. CANDIDATE C

# 10-STEP SEASONAL / ZAID / FESTIVAL ENGINE

## 4.1 Relevant files

Primary engine: `frontend/src/lib/seasonal-crop-engine.ts`  
UI: `frontend/src/features/recommendations/SeasonalCropPlanningPanel.tsx`  
Page: `frontend/src/app/crop-services/seasonal/page.tsx`  
Dashboard integration: `frontend/src/app/recommendations/RecommendationDashboard.tsx`

---

## 4.2 Entry Point

The UI calls:
```text
evaluateSeasonalCropPlanning(...)
```
using planning type, farm area, available days, festival ID, main crop, coordinates, and soil/water resources.  
**VERIFIED:** The UI genuinely invokes the seasonal engine.

---

## 4.3 Festival Catalog & Multipliers

The engine contains hardcoded records in `INDIAN_FESTIVALS_CATALOG`:
* Chhath Puja $\to$ 1.45x (+45%)
* Diwali $\to$ 1.35x (+35%)
* Eid-ul-Fitr $\to$ 1.35x (+35%)
* Navratri $\to$ 1.30x (+30%)
* Holi $\to$ 1.25x (+25%)
* Baisakhi / Ugadi $\to$ 1.20x (+20%)

**VERIFIED:** Fixed static multipliers in source code.  
**NOT VERIFIED:** Empirical econometric origin or time-series fitting.

---

## 4.4 Date Calculation & Sowing Timeline

* **Festival Date:** Approximated as day 15 of the festival's month (`Date(year, month - 1, 15)`). Not an astronomical or lunar religious calendar.
* **Sowing Date:** Sets `sowingDate = currentDate` and adds duration forward.
* **Discrepancy:** The claimed "back-calculation from festival date to sowing date" is **NOT VERIFIED**; the code projects harvest forward from today.

---

## 4.5 Integration with 4-Part Optimizer

**VERIFIED: CLIENT-SIDE UI STATE OVERRIDE ONLY**

`portfolio-optimizer.ts` does not call `seasonal-crop-engine.ts`.  
Integration occurs strictly in `RecommendationDashboard.tsx` (lines 379–438): when a user accepts a seasonal crop, React rescales the 4 base crop acres to $(A_{\text{total}} - A_{\text{seasonal}})$ and appends "Part 5" with hardcoded yield `6 q/ac` and `mspSafety: true`.

---

## 4.6 Candidate C Overall Assessment

### Verified technical substance
An interactive planning wizard that filters short-duration crops by calendar window, matches produce to holiday demand tags, and rescales UI parcel acreage.

### Technically distinctive?
**NOT ESTABLISHED.**  
Traditional farmer planting timing translated into elementary calendar date arithmetic and static scalar multiplication (abstract business rules / mental process under Section 3(k)).

---

# 5. CANDIDATE D

# 3-LAYER SOIL + FERTILIZER ENGINE

## 5.1 Relevant files

Primary files: `frontend/src/lib/soil-service.ts`, `frontend/src/lib/fertilizer-engine.ts`  
ML model: `ml-service/app/models/fertilizer_model.py`

---

## 5.2 Three-Layer Depth Profile

**VERIFIED**
* Layer 1: 0–15 cm (Topsoil)
* Layer 2: 15–30 cm (Subsoil)
* Layer 3: 30–60 cm (Deep Zone)
Extracts pH, EC, OC, N, P, K, S, Zn across layers.

---

## 5.3 Depth-Weighted Compatibility & Nutrient Integration

**VERIFIED**

Root-zone compatibility weighting:
* Shallow: $0.75 L_1 + 0.25 L_2$
* Medium: $0.45 L_1 + 0.40 L_2 + 0.15 L_3$
* Deep: $0.30 L_1 + 0.35 L_2 + 0.35 L_3$

Nutrient integration (Medium-root):
* Effective N: $0.60 L_1 + 0.40 L_2$
* Effective P: $0.70 L_1 + 0.30 L_2$
* Effective K: $0.60 L_1 + 0.40 L_2$

---

## 5.4 Is This a Real ICAR STCR Quadratic Equation?

**NOT VERIFIED — SOURCE CODE PROVES OTHERWISE**

The implementation uses standard **Recommended Doses of Fertilizer (RDF) percentage adjustments**:
* Low status $\to 1.25\times$
* Medium status $\to 1.00\times$
* High status $\to 0.40\times$ (N), $0\times$ (P, K)
* OC credit: if OC $\ge 0.75\%$, N reduced by 15%.

Commercial conversion uses standard stoichiometry:
* $\text{SSP} = \text{netP} / 0.16$ (if pH < 6.2)
* $\text{DAP} = \text{netP} / 0.46$ (offsets 18% N)
* $\text{Urea} = \text{remainingN} / 0.46$
* $\text{MOP} = \text{netK} / 0.60$

The claimed quadratic equation ($FD = A \cdot T - B \cdot STV$) does not exist in code.

---

## 5.5 Candidate D Overall Assessment

### Verified technical substance
Substantial multi-layer heuristic evaluation and standard extension fertilizer stoichiometry.

### Technically distinctive?
**NOT ESTABLISHED.**  
Standard textbook agronomy and extension rules coupled with unvalidated heuristic depth-weighting constants.

---

# 6. CANDIDATE E

# GOVERNMENT PROCUREMENT DISINTERMEDIATION ARCHITECTURE

## 6.1 Relevant files

* `frontend/src/app/marketplace/components/GovernmentProcurementTerminal.tsx`
* `frontend/src/app/marketplace/components/MspRequestModal.tsx`
* `frontend/src/app/marketplace/components/ProcurementReceiptModal.tsx`
* `frontend/src/lib/marketplace-service.ts`
* `frontend/src/lib/biometric-adapter.ts`

---

## 6.2 12-Digit Passcode & Replay Prevention

* **12-Digit Code:** **VERIFIED.** Generated using 8 bytes from `crypto.getRandomValues(randomBytes)` padded with `Math.random()`. Not unforgeable cryptographic tokens, but functional random numbers.
* **Single-Use Replay Prevention:** **VERIFIED.** Checks `codeRecord.isConsumed === true` and sets `isConsumed = true` upon procurement. Stored in transient in-memory `Map`.

---

## 6.3 Hardware, Biometric, PostGIS, & DBT Simulations

1. **PostGIS Quota Enforcement:** **NOT VERIFIED.** `farmId` is an unvalidated optional string. Zero polygon spatial queries or acreage yield caps exist in the procurement pipeline.
2. **Weighbridge Integration:** **NOT VERIFIED.** Manual HTML numeric form input. Zero serial port / IoT integration.
3. **FCI Moisture Penalty Formula:** **NOT VERIFIED.** Payout is simply `weighedQuantity * mspRate`. Zero moisture deduction formulas exist.
4. **UIDAI Iris Biometrics:** **VERIFIED DEMO ADAPTER.** Returns hardcoded dummy string `BIO-REF-<hex>`. No Aadhaar server integration.
5. **PFMS Direct Benefit Transfer:** **VERIFIED SIMULATED STRING.** Sets `paymentStatus = "PAID_DEMO"`. Zero banking gateways.
6. **Digital Receipt Signature:** **NOT VERIFIED AS CRYPTOGRAPHIC.** Signature is plain browser `btoa()` Base64 encoding.

---

## 6.4 Candidate E Overall Assessment

### Verified technical substance
A complete Next.js frontend state machine and in-memory authorization workflow.

### Technically distinctive?
**NOT ESTABLISHED.**  
Standard web application demo. The claimed physical-digital links (IoT weighbridge, FCI moisture formula, PostGIS quota cap, UIDAI iris matching, PFMS banking) exist strictly as UI labels and conceptual documentation.

---

# 7. CODE VS README / investigation.md MISMATCHES

| Mechanism | Claim in Documentation | Reality in Inspected Source Code | Verification Tag |
|---|---|---|:---:|
| **Candidate A: Optimization** | Markowitz MPT & Constrained Knapsack | Greedy top-1 pick per role + fixed static % splits (35/30/20/15) | `[NOT VERIFIED]` |
| **Candidate A: Budget Constraint** | Hard working-capital bound | Budget does not prune selection; post-hoc $1.1\times$ check only | `[NOT VERIFIED]` |
| **Candidate A: Stress Testing** | 7-Scenario Monte Carlo Simulation | 7 deterministic scalar multipliers on aggregate totals | `[NOT VERIFIED]` |
| **Candidate A: ML Coupling** | ML yield & price parameterize optimizer | Optimizer reads static tables; ML microservice never called | `[NOT VERIFIED]` |
| **Candidate B: Allocation Framework** | 4-Part Risk-Stratified Allocation | Slices top 3 crops only; ignores 4-role taxonomy | `[NOT VERIFIED]` |
| **Candidate B: Live Path** | Primary user recommendation pipeline | Orphaned API route; UI runs client-side `portfolio-optimizer.ts` | `[NOT VERIFIED]` |
| **Candidate B: Revenue Formula** | Accurate financial break-even projection | Inverted algebraic bug: yield replaced by `costPerAcre` | `[NOT VERIFIED]` |
| **Candidate B: Dataset Provenance** | 7,000 ICAR rows & 19,500 Agmarknet rows | 100% synthetic seed data per `data/README.md` | `[NOT VERIFIED]` |
| **Candidate C: Sowing Date** | Back-calculated sowing dates from festival | Projects forward from current date (`addDays(now, duration)`) | `[NOT VERIFIED]` |
| **Candidate C: Optimizer Coupling** | Integrated Part 5 in Portfolio Optimizer | Client-side React `useMemo` UI override with hardcoded yield `6` | `[NOT VERIFIED]` |
| **Candidate C: Demand Multipliers** | Empirical econometric regression curves | Hardcoded static constants in array catalog | `[NOT VERIFIED]` |
| **Candidate D: STCR Equations** | ICAR STCR Quadratic Equations ($A \cdot T - B \cdot STV$) | Standard extension RDF status adjustments (+25%, -60%) | `[NOT VERIFIED]` |
| **Candidate D: Depth Weights** | Calibrated multi-layer soil absorption | Heuristic linear constants (0.45/0.40/0.15) | `[NOT VERIFIED]` |
| **Candidate E: PostGIS Quota** | Cadastral land-polygon physical yield cap | Unvalidated optional string `farmId`; zero spatial checks | `[NOT VERIFIED]` |
| **Candidate E: Passcode Security** | Cryptographically secure unforgeable token | Hybrid `crypto.getRandomValues` + `Math.random()` padding | `[NOT VERIFIED]` |
| **Candidate E: Weighbridge** | Automated IoT gross/tare weight logging | Manual HTML `<input type="number">` form field | `[NOT VERIFIED]` |
| **Candidate E: Moisture Penalty** | Strict statutory FCI <12% moisture formula | Payout is `qty * mspRate`; formula absent from code | `[NOT VERIFIED]` |
| **Candidate E: Biometric Proof** | UIDAI Iris biometric proof-of-presence | Mock adapter returning hardcoded demo string | `[NOT VERIFIED]` |
| **Candidate E: DBT Settlement** | 100% Direct Benefit Transfer via PFMS | Mock string `paymentStatus = "PAID_DEMO"` | `[NOT VERIFIED]` |
| **Candidate E: Digital Receipt** | Cryptographic digital signature hash | Standard browser `btoa()` Base64 encoding | `[NOT VERIFIED]` |

---

# 8. VERIFIED GIT LINEAGE & PUBLIC DISCLOSURE DATES

Full Git history audit confirms the exact commit dates when each mechanism appeared publicly on GitHub:

* **Candidate A (`portfolio-optimizer.ts`):** First committed in **`20d52f9`** on **2026-09-12 22:54:23 +0530**.
* **Candidate B (`recommendation-engine.ts`, ML models):** Base engine in **`20d52f9`** (2026-09-12); ML microservice added in **`2707b49`** (2026-09-13 13:11:22 +0530) and **`e1173be`** (2026-09-14 00:49:04 +0530).
* **Candidate C (`seasonal-crop-engine.ts`):** First committed in **`e1173be`** on **2026-09-14 00:49:04 +0530**.
* **Candidate D (`soil-service.ts`, `fertilizer-engine.ts`):** First committed in **`2707b49`** on **2026-09-13 13:11:22 +0530**.
* **Candidate E (`marketplace-service.ts`, Mandi terminal):** First committed in **`e1173be`** on **2026-09-14 00:49:04 +0530**.
* **Public Disclosure of `investigation.md`:** Committed to public GitHub repo in **`096f79f`** on **2026-09-20 20:04:43 +0530**.
* **License Replacement:** MIT License replaced with Proprietary / Patent Pending in **`fc84146`** on **2026-09-20 20:13:30 +0530**.

### Legal Implication
`[REQUIRES PATENT PROFESSIONAL REVIEW]`  
All five candidates were publicly visible on GitHub under a permissive MIT license between 2026-09-12 and 2026-09-20. Under Indian Patent Act Sections 29–34 and US 35 U.S.C. § 102(b), patent counsel must evaluate whether this constitutes a public disclosure bar and whether 12-month grace periods apply.

---

# 9. CURRENT TECHNICAL-SUBSTANCE RANKING (CANDIDATES A THROUGH E)

This is **NOT a patentability ranking**. It is a ranking of verified technical code substance implemented in the repository:

### 1. Candidate D — 3-Layer Depth Soil Engine
* **Status: Substantial Verified Implementation.**
* Processing pipeline: 3 depth layers $\to$ cross-layer diagnostics $\to$ root-depth classification $\to$ depth-weighted compatibility $\to$ nutrient integration $\to$ stoichiometric fertilizer formulation (SSP/DAP/Urea/MOP).
* Weakness: Standard extension RDF adjustments; depth weights are unvalidated heuristics.

### 2. Candidate A — 4-Part Risk-Stratified Portfolio Optimizer
* **Status: Functional Client-Side Implementation.**
* Fast, responsive browser-side engine with multi-factor scoring and 4 strategic agricultural roles.
* Weakness: Greedy top-1 pick + fixed percentage splits; zero MPT solvers; deterministic scalar stress table. Falls under abstract business/mental rules (Section 3(k)).

### 3. Candidate C — 10-Step Seasonal / Festival Engine
* **Status: Substantial Heuristic Rule Engine.**
* Interactive planning panel, date arithmetic, duration filters, and dynamic dashboard acreage rescaling.
* Weakness: Basic calendar subtraction and static scalar multipliers; traditional farmer knowledge codified as business rules.

### 4. Candidate B — ML-Coupled Recommendation Engine
* **Status: Functional Microservice with Defective Financial Coupling.**
* Working FastAPI microservice and HTTP bridge.
* Weakness: Orphaned API route disconnected from the dashboard; yield ML coupled to an inverted algebraic revenue bug; trained on 100% synthetic data.

### 5. Candidate E — Government Procurement Disintermediation
* **Status: Functionally Substantial UI, but External Technical Claims are Simulated.**
* Complete Next.js state machine, single-use code checking, and receipt generation.
* Weakness: PostGIS quota cap, IoT weighbridge tare, FCI moisture formula, UIDAI iris matching, and PFMS DBT rails do not exist in code; they are string and UI simulations.

---

# 10. EVIDENCE NEEDED BEFORE PRIOR-ART SEARCH

Prior-art searches are **not justified** at this stage because none of the five candidates possess an established, patent-eligible technical core. The following empirical evidence must be generated:

1. **Candidate A:** Implement an actual quadratic programming solver minimizing portfolio return variance ($\min \mathbf{w}^T \mathbf{\Sigma} \mathbf{w}$) subject to budget constraints, with an empirical covariance matrix and $N \ge 1,000$ Monte Carlo stochastic iterations.
2. **Candidate B:** Retrain ML models on real Agmarknet/ICAR historical records; fix the inverted algebraic revenue bug; hook the microservice directly into the live user dashboard.
3. **Candidate C:** Train an econometric time-series regression model on 5–10 years of Agmarknet price arrivals demonstrating that festival demand spikes are statistically predictable.
4. **Candidate D:** Conduct multi-depth soil core field trials comparing AgriProfit's 3-layer formulation against standard single-layer Soil Health Cards to measure real yield improvements or fertilizer savings.
5. **Candidate E:** Implement real RS-232 / TCP serial weighbridge communication, an automated FCI moisture deduction formula, and an actual PostGIS polygon area constraint query.

---

# 11. INVENTOR QUESTIONS

### Candidate A
1. Was a quadratic programming solver (e.g. CVXOPT, SciPy `minimize`) or knapsack dynamic programming algorithm ever coded privately?
2. Where did the specific utility weighting constants (0.55, 0.40, 0.35) and risk splits (35/30/20/15) come from?
3. Why does `portfolio-optimizer.ts` report ML models in its `dataLineage` metadata when it only uses static tables?

### Candidate B
1. Why is `/api/recommendations` disconnected from `RecommendationDashboard.tsx`?
2. Was the algebraic substitution in lines 614–615 intentional or a refactoring defect?
3. Are there any real (non-synthetic) field yield or mandi arrival datasets collected?

### Candidate C
1. Were the festival multipliers (1.20x to 1.45x) calculated from real Agmarknet arrival/price historical spikes?
2. Was an astronomical / lunar Hindu festival calendar ever implemented privately?

### Candidate D
1. Were the depth-weighting fractions (0.45/0.40/0.15) derived from specific ICAR soil core publications or assigned heuristically?
2. Why does the code use Base RDF adjustments rather than the actual ICAR STCR targeted yield formula ($A \cdot T - B \cdot STV$)?

### Candidate E
1. Is there a separate IoT gateway repository interfacing with physical digital weighbridges?
2. Was the PostGIS quota enforcement logic written in another branch or database stored procedure?
3. Has an actual sandbox integration with UIDAI Aadhaar Authentication API or PFMS payment gateway been developed?

---

# 12. CURRENT STATUS

```text
STEP 1 — Inventorship / ownership: COMPLETE
STEP 2 — README investigation: COMPLETE
STEP 3 — PPT investigation: COMPLETE
STEP 4 — investigation.md: COMPLETE (Public disclosure identified)
STEP 5 — Public disclosure review: STARTED
STEP 6A — Candidate A: COMPLETE
STEP 6B — Candidate B: COMPLETE
STEP 6C — Candidate C: COMPLETE
STEP 6D — Candidate D: COMPLETE
STEP 6E — Candidate E: COMPLETE
NEXT:
  └── STEP 7 — EMPIRICAL EVIDENCE & INVENTOR RESOLUTION
  └── STEP 8 — REGISTERED PATENT AGENT CONSULTATION (Prior to any Prior-Art Search)
```

---

# 13. FINAL CONCLUSION

The source-code audit across Candidates A, B, C, D, and E reveals:
* **Implemented Software Workflows:** Real TypeScript UI components, heuristic scoring engines, stoichiometric fertilizer tables, and random passcode generators exist and operate.
* **Absence of Claimed Technical Core:** Mathematical solvers (MPT, knapsack, Monte Carlo), real ICAR STCR quadratic equations, econometric festival models, ML dashboard coupling, and physical hardware/government integrations (PostGIS quota cap, IoT weighbridge, FCI moisture deduction, UIDAI iris, PFMS DBT) **do not exist in the code**.
* **Public Disclosure & Section 3(k) Bars:** The code was public under an MIT License from 2026-09-12 to 2026-09-20, and the heuristic rules fall squarely under non-patentable abstract mental processes and business methods under Section 3(k) of the Indian Patent Act and 35 U.S.C. § 101.

> **Conclusion:** No candidate has yet established a patentable technical core. Prior-art searches should be paused until empirical agronomic evidence, real mathematical solvers, and physical hardware integrations are implemented.
