# Cardekho Assignment — Car Finalization Website

## Local Run

**Backend** (`:8080`):
```bash
go run cmd/main.go
```

**Frontend** (`:5173`):
```bash
cd web && npm install && npm run dev
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

## What did you deliberately cut?

Because of time issue and in shot time i do not want to deal with database, so remove optional auth system from this for users and for admin to add cars.

Also I used in-memory storage due to that

## What tech stack and why?

For Frontend:
-> React + TS

Ts for type-safety
and also I am comfortable with react and ts both, So i can even debug when AI fails

For Backend:
-> Golang 

I am most comfortable in golang for api development and specially Gin-REST API framework of Golang 

## What did AI tools do vs what you did manually?

AI tools do most of the coding

I preferred testing of the website and debugging on any test failure.
Also, I handled the deployment all myself, because I do not want to give access of my VPS server

I also kept track of steps which are implemented or not