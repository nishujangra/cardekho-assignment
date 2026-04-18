# Recommendations API

## `POST /api/recommendations`

Scores all cars against the user's needs and returns the top 3 matches, each with a score, reasons it fits, and tradeoffs.

**Request body**

| Field              | Type   | Required | Description |
|--------------------|--------|----------|-------------|
| `budget_max_inr`   | int    | yes      | Maximum price in INR |
| `family_size`      | int    | yes      | Minimum seating needed |
| `fuel_preference`  | string | yes      | `any` / `petrol` / `diesel` / `cng` / `ev` / `hybrid` |
| `primary_usage`    | string | yes      | `city` / `highway` / `mixed` |
| `safety_priority`  | int    | yes      | 1 (low) – 5 (high) |
| `mileage_priority` | int    | yes      | 1 (low) – 5 (high) |
| `transmission_pref`| string | yes      | `any` / `manual` / `automatic` |
| `body_type_pref`   | string | yes      | `any` / `hatchback` / `sedan` / `suv` / `mpv` |

**cURL**
```bash
curl -X POST http://localhost:8080/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "budget_max_inr": 1500000,
    "family_size": 4,
    "fuel_preference": "any",
    "primary_usage": "city",
    "safety_priority": 4,
    "mileage_priority": 3,
    "transmission_pref": "any",
    "body_type_pref": "any"
  }'
```

**Response** — array of up to 3 recommendations, sorted by score descending.
```json
[
  {
    "car": { ... },
    "score": 127.7,
    "why_fits": [
      "High safety rating",
      "Great for city driving"
    ],
    "tradeoffs": null
  }
]
```

> `tradeoffs` is `null` when there are none (Go serialises an empty slice as `null`).

**Scoring logic (summary)**

Hard filters applied first — any car that fails these is excluded:
- `price_inr > budget_max_inr`
- `seating_capacity < family_size`
- fuel / transmission / body type preference (when not `any`)

Remaining cars are scored by weighted factors:
- Safety rating × `safety_priority`
- Mileage (or EV flat bonus) × `mileage_priority`
- City / highway / mixed usage score
- Price headroom (closer to budget = better equipped)
