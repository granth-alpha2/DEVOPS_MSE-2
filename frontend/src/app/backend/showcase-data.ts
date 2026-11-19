export type CardKey =
  | "architecture"
  | "backend"
  | "api"
  | "database"
  | "docker"
  | "cicd"
  | "testing"
  | "deployment"
  | "git";

export type ShowcaseCard = {
  key: CardKey;
  icon: string;
  title: string;
  technology: string;
  status: "Implemented" | "Configured" | "Partially configured" | "Not implemented";
  description: string;
  accent: "emerald" | "sky" | "amber" | "rose";
  details: {
    purpose: string;
    how: string;
    files: string[];
    flow: string[];
    example: string;
    snippet: string;
    usage: string[];
  };
};

export const showcaseCards: ShowcaseCard[] = [
  {
    key: "architecture",
    icon: "🏗️",
    title: "Application Architecture",
    technology: "Next.js · FastAPI · PostgreSQL",
    status: "Implemented",
    description: "Monolithic Next.js portal with route handlers and a separate Python ML microservice.",
    accent: "emerald",
    details: {
      purpose: "AgriProfit is organized as a Next.js application, a FastAPI ML microservice, and a persistent PostgreSQL/PostGIS data layer.",
      how: "Pages and route handlers live in frontend/src/app. Farm, soil, market, recommendation, and auth logic is called through repositories and domain services. The Python service supplies yield, price, and fertilizer inference.",
      files: ["frontend/src/app", "frontend/src/lib", "ml-service/app", "database"],
      flow: ["Browser UI", "Next.js route", "Domain service", "PostgreSQL or FastAPI", "JSON / page state"],
      example: "When a farmer opens Crop Planning, Next.js reads farm preferences and weather, runs the recommendation engine, then optionally enriches the result from FastAPI.",
      snippet: "Browser\n  ↓ /api/recommendations\n  Recommendation Engine\n  ↓\n  Weather + Soil + Market + ML\n  ↓\n  Crop allocation result",
      usage: ["Next.js App Router serves 90+ portal pages and APIs.", "TypeScript recommendation, soil, market, and simulation engines implement the agricultural logic.", "FastAPI is used only for trained model inference.", "Docker Compose connects the web, ML, PostgreSQL, Redis, and Nginx layers."],
    },
  },
  {
    key: "backend",
    icon: "🧩",
    title: "Backend Working",
    technology: "Next.js Route Handlers · TypeScript",
    status: "Implemented",
    description: "Server-side routing, request validation, repositories, services, and domain engines.",
    accent: "sky",
    details: {
      purpose: "App Router route handlers execute AgriProfit operations without exposing a separate Express server.",
      how: "A page calls an API route, the route verifies the JWT or demo identity, validates the body, invokes a repository or engine, and returns NextResponse JSON.",
      files: ["frontend/src/app/api", "frontend/src/lib/auth.ts", "frontend/src/lib/request-auth.ts", "frontend/src/lib/farm-context.ts"],
      flow: ["User action", "Route handler", "Auth + validation", "Repository / engine", "NextResponse JSON"],
      example: "POST /api/farms validates a drawn polygon, checks the session user, creates the farm record, and calls saveFarm() for persistent storage.",
      snippet: "const body = await request.json()\nconst user = await getRequestUser()\nawait saveFarm(farm)\nreturn NextResponse.json({ success: true, farm })",
      usage: ["Authentication routes create and verify the portal session.", "Farm routes create and update mapped parcels.", "Recommendation routes combine weather, soil, market, and profitability inputs.", "Health, notification, marketplace, and admin APIs expose application data."],
    },
  },
  {
    key: "api",
    icon: "🔌",
    title: "API Communication",
    technology: "REST · JSON · FastAPI",
    status: "Implemented",
    description: "The frontend calls Next.js route handlers and the ML bridge calls the Python API.",
    accent: "amber",
    details: {
      purpose: "AgriProfit uses REST JSON communication inside the Next.js boundary and to reach the ML microservice.",
      how: "React components use fetch() for local APIs. frontend/src/lib/ml-client.ts adds timeouts, validates responses, and falls back to deterministic data when FastAPI is unavailable.",
      files: ["frontend/src/app/api", "frontend/src/lib/ml-client.ts", "ml-service/app/api/routes"],
      flow: ["React fetch()", "Next.js JSON API", "ML bridge", "FastAPI model", "Parsed result"],
      example: "The fertilizer analysis page sends soil measurements to Next.js; the bridge posts them to /predict/fertilizer, validates the returned dosages, and can then use the agronomic fallback.",
      snippet: "POST /predict/yield\nPOST /predict/price\nPOST /predict/fertilizer\nGET  /health",
      usage: ["Yield planning uses predictYieldWithML().", "Market planning uses forecastPriceWithML().", "Fertilizer analysis uses predictFertilizerWithML().", "All ML calls have bounded timeouts and offline fallbacks."],
    },
  },
  {
    key: "database",
    icon: "🗄️",
    title: "Database & Data Flow",
    technology: "PostgreSQL · PostGIS · pg",
    status: "Implemented",
    description: "Persistent repositories use PostgreSQL; repositories fall back to in-memory state when no database URL exists.",
    accent: "emerald",
    details: {
      purpose: "PostgreSQL stores the persistent AgriProfit entities and PostGIS stores farm polygons.",
      how: "The Docker app receives DATABASE_URL. Repositories reuse a pg Pool, insert geography through ST_GeogFromText, and read polygons through ST_AsGeoJSON.",
      files: ["database/init_consolidated.sql", "database/migrations", "frontend/src/app/api/farms/repository.ts", "frontend/src/lib/farmer-repository.ts"],
      flow: ["Farm API", "Farm repository", "pg Pool", "PostGIS polygon", "Farm JSON"],
      example: "A parcel drawn on the map is closed into a polygon, stored with area and owner ID, and later returned to the UI as latitude/longitude coordinates.",
      snippet: "DATABASE_URL=postgresql://…@postgres:5432/agriprofit\nST_GeogFromText($7)\nST_AsGeoJSON(boundary::geometry)",
      usage: ["init_consolidated.sql creates farms, users, crops, preferences, market prices, and MSP entities.", "Farm owner and JSON preference fields support the frontend workflows.", "The repository retains an in-memory fallback for local development without DATABASE_URL.", "Migrations provide the broader recommendation, profitability, audit, and chat schema."],
    },
  },
  {
    key: "docker",
    icon: "🐳",
    title: "Docker & Compose",
    technology: "Docker · Docker Compose",
    status: "Configured",
    description: "Application containers, a bridge network, health checks, and persistent volumes are defined.",
    accent: "sky",
    details: {
      purpose: "Docker runs AgriProfit as isolated, repeatable containers that preserve the single-stack demonstration.",
      how: "Dockerfile performs a three-stage Next.js build. ML Dockerfile installs FastAPI dependencies. Compose starts app, ml, postgres, redis, and nginx with health dependencies.",
      files: ["Dockerfile", "ml-service/Dockerfile", "docker-compose.yml", "docker-compose.dev.yml", "docker-compose.prod.yml"],
      flow: ["Source", "Dockerfile", "Image", "Container", "Nginx host"],
      example: "The app uses http://ml:8000 and http://postgres:5432. These service names only work inside the Compose network.",
      snippet: "app  → 3000\nml   → 8000\npostgres → 5432\nredis    → 6379",
      usage: ["PostGIS initializes from init_consolidated.sql.", "Named volumes preserve PostgreSQL and Redis data.", "App and ML health checks gate stack readiness.", "Nginx exposes port 8080 locally and port 80 for EC2."],
    },
  },
  {
    key: "cicd",
    icon: "🔄",
    title: "CI/CD Pipeline",
    technology: "GitHub Actions",
    status: "Configured",
    description: "Push and pull-request workflows run TypeScript validation and ML tests; no deployment job is configured.",
    accent: "amber",
    details: {
      purpose: "GitHub Actions validates AgriProfit code before changes reach main/master.",
      how: "The web workflow installs Node 20 dependencies, runs TypeScript, and executes selected integration scripts. A separate path-triggered workflow validates ML code and datasets.",
      files: [".github/workflows/ci.yml", ".github/workflows/ml-validation.yml"],
      flow: ["Push / PR", "GitHub Actions", "Dependencies", "Typecheck / pytest", "Pass or fail"],
      example: "A change in ml-service or data triggers the Python 3.11 validation workflow. A normal app change triggers Node typecheck and integration tests.",
      snippet: "npx --prefix frontend tsc --noEmit\npytest ml-service/tests/",
      usage: ["Web CI checks farms, portfolio, markets, weather, and auth.", "ML CI installs requirements and runs ml-service/tests.", "No deployment job is currently configured.", "The workflow does not claim a live success status without reading GitHub."],
    },
  },
  {
    key: "testing",
    icon: "🧪",
    title: "Testing & Quality",
    technology: "tsx assertions · pytest",
    status: "Implemented",
    description: "Integration scripts and Python unit tests verify application and ML behavior.",
    accent: "emerald",
    details: {
      purpose: "Testing verifies the real AgriProfit farm, market, auth, portfolio, weather, ML, and data behaviors.",
      how: "TypeScript scripts use tsx and Node assertions. pytest validates ML prediction and model registry behavior. CI runs a subset of these scripts automatically.",
      files: ["tests/integration", "frontend/tests/integration", "ml-service/tests", "frontend/package.json"],
      flow: ["Test script", "Real function", "Assertion", "Console / CI result"],
      example: "test_farms validates farm repository behavior, while ml-service/tests validates trained model loading and prediction routes.",
      snippet: "npx --prefix frontend tsx tests/integration/test_farms.ts\npytest ml-service/tests/",
      usage: ["15 farm integration checks passed locally.", "10 ML pytest checks passed locally.", "The Docker build performs production TypeScript validation.", "Live test status is not fabricated in the visualization."],
    },
  },
  {
    key: "deployment",
    icon: "🚀",
    title: "Deployment & Infrastructure",
    technology: "Docker · Nginx · EC2",
    status: "Partially configured",
    description: "Production Compose and EC2 deployment scripts exist; a live hosted target is not assumed.",
    accent: "rose",
    details: {
      purpose: "Deployment packages the AgriProfit stack for an AWS EC2 Ubuntu host behind Nginx.",
      how: "The EC2 script generates an .env, builds containers, starts Compose, and waits for /api/health. Nginx proxies browser traffic to app and ML traffic to ml.",
      files: ["docker-compose.yml", "infrastructure/nginx/nginx.conf", "scripts/ec2_deploy.sh", "EC2_DEPLOYMENT.md"],
      flow: ["EC2 setup", "Generated secrets", "Docker build", "Nginx", "Containers"],
      example: "On EC2, / reaches Next.js on port 3000 and /ml/ reaches FastAPI on port 8000 without publishing internal database or cache ports.",
      snippet: "./scripts/ec2_deploy.sh\ncurl http://127.0.0.1/api/health",
      usage: ["The script creates secure PostgreSQL and JWT values.", "Security groups expose SSH and HTTP/HTTPS only.", "PostgreSQL, Redis, app, and ML remain on the internal bridge network.", "HTTPS is documented but is not yet configured by the repository."],
    },
  },
  {
    key: "git",
    icon: "🌿",
    title: "Git & Version Control",
    technology: "Git · GitHub",
    status: "Implemented",
    description: "Repository history and branches feed GitHub Actions and deployment scripts.",
    accent: "sky",
    details: {
      purpose: "Git preserves the AgriProfit source and coordinates CI validation for app and ML changes.",
      how: "Frontend, ML, database, workflows, infrastructure, and data are tracked in one repository. Pushes and pull requests trigger the configured workflows.",
      files: [".gitignore", ".github/workflows/ci.yml", ".github/workflows/ml-validation.yml"],
      flow: ["Code change", "Git commit", "Push / PR", "Workflow trigger", "Validation"],
      example: "A Dockerfile or Next.js change follows normal push/PR CI. An ML or dataset change triggers ML-specific validation.",
      snippet: "on:\n  push:\n    branches: [main, master]",
      usage: ["The repository uses main/master triggers in ci.yml.", "ML validation watches ml-service and data paths.", "Secrets and local environment files are excluded through .gitignore.", "Live branch protection and merge status require GitHub runtime data."],
    },
  },
];
