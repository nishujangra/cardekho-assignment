# Cardekho Assignment — Car Finalization Website

## Local Run

**Backend** (`:8080`):
```bash
go run cmd/main.go
```

**Frontend** (`:5173`):
```bash
cd web
vi .env # edit VITE_API_BASE_URL
npm install && npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/cars` | List cars (`budget_max`, `fuel_type`, `seating`, `transmission`, `body_type` filters) |
| GET | `/api/cars/:id` | Car details |
| POST | `/api/cars` | Add a car (internal/admin) |
| POST | `/api/recommendations` | Top 3 recommendations from user needs |
| POST | `/api/shortlists` | Create shortlist |
| GET | `/api/shortlists` | List all shortlists |
| GET | `/api/shortlists/:id` | Shortlist with full car details |
| PUT | `/api/shortlists/:id` | Update shortlist |
| DELETE | `/api/shortlists/:id` | Delete shortlist |

---

## What did you build and why?

A full-stack car recommendation website that helps users find the right car based on their needs — budget, family size, fuel preference, usage pattern, and safety/mileage priorities. The app scores all available cars against these inputs and returns the top 3 matches with clear reasoning and tradeoffs, so users can make a confident, informed decision.

## What did you deliberately cut?

- **Authentication & admin controls** — adding user auth and an admin panel to manage cars was out of scope for the time available and not core to the recommendation flow.
- **Persistent database** — opted for an in-memory store to keep the setup simple and dependency-free. The architecture is structured so swapping in a real database (e.g. PostgreSQL) would be straightforward.

## What tech stack and why?

**Frontend:** React + TypeScript + Tailwind CSS
- TypeScript for type safety and easier debugging
- React because I'm productive with it and can troubleshoot quickly when needed
- Tailwind for rapid, consistent UI without a separate stylesheet overhead

**Backend:** Go + Gin
- Go is my strongest language for API development
- Gin is lightweight, fast, and well-suited for RESTful services

## What did AI tools do vs what you did manually?

AI handled the majority of code generation. My contributions were:
- Reviewing and testing each feature end-to-end
- Debugging any failures and validating correct behavior
- Tracking implementation progress against the plan
- Writing and managing the deployment pipeline to my VPS entirely myself (kept credentials and server access private)

## Where did AI help most?

Across the entire codebase — scaffolding the Go backend, wiring up the recommendation scoring logic, building the React pages and component structure, and setting up routing. It significantly reduced the time spent on boilerplate.

## Where did AI get in the way?

Nowhere significant. The workflow of generating → testing → fixing worked smoothly throughout.

## If you had 4 more hours, what would you add?

- User authentication and role-based admin controls to manage the car catalogue
- PostgreSQL for persistent storage
- Redis for session management