# Cars API

Base path: `/api/cars`

---

## `GET /api/cars`

List all cars. Supports optional query filters.

| Query Param    | Type   | Description                              |
|----------------|--------|------------------------------------------|
| `budget_max`   | int    | Max price in INR                         |
| `fuel_type`    | string | `petrol` / `diesel` / `cng` / `ev` / `hybrid` |
| `seating`      | int    | Minimum seating capacity                 |
| `transmission` | string | `manual` / `automatic`                  |
| `body_type`    | string | `hatchback` / `sedan` / `suv` / `mpv`  |

**cURL — all cars**
```bash
curl http://localhost:8080/api/cars
```

**cURL — filtered**
```bash
curl "http://localhost:8080/api/cars?fuel_type=ev&budget_max=2500000"
```

**Response**
```json
[
  {
    "id": "4",
    "brand": "Tata",
    "model": "Nexon EV",
    "variant": "Max LR",
    "price_inr": 1950000,
    "body_type": "suv",
    "fuel_type": "ev",
    "transmission": "automatic",
    "seating_capacity": 5,
    "mileage_kmpl": 0,
    "safety_rating": 5,
    "boot_space_litres": 350,
    "city_score": 9,
    "highway_score": 7,
    "feature_tags": ["6-airbags", "adas", "sunroof", "fast-charge"]
  }
]
```

---

## `GET /api/cars/:id`

Get a single car by ID.

**cURL**
```bash
curl http://localhost:8080/api/cars/3
```

**Response** — same shape as a single object from the list above.

**404 — not found**
```json
{ "error": "car not found" }
```

---

## `POST /api/cars`

Add a new car (internal/admin use).

**Request body**
```json
{
  "id": "99",
  "brand": "Honda",
  "model": "Elevate",
  "variant": "ZX CVT",
  "price_inr": 1900000,
  "body_type": "suv",
  "fuel_type": "petrol",
  "transmission": "automatic",
  "seating_capacity": 5,
  "mileage_kmpl": 17.8,
  "safety_rating": 4.5,
  "boot_space_litres": 458,
  "city_score": 8,
  "highway_score": 8,
  "feature_tags": ["sunroof", "adas", "touchscreen"]
}
```

**cURL**
```bash
curl -X POST http://localhost:8080/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "id": "99",
    "brand": "Honda",
    "model": "Elevate",
    "variant": "ZX CVT",
    "price_inr": 1900000,
    "body_type": "suv",
    "fuel_type": "petrol",
    "transmission": "automatic",
    "seating_capacity": 5,
    "mileage_kmpl": 17.8,
    "safety_rating": 4.5,
    "boot_space_litres": 458,
    "city_score": 8,
    "highway_score": 8,
    "feature_tags": ["sunroof", "adas", "touchscreen"]
  }'
```

**Response** — `201 Created` with the created car object.
