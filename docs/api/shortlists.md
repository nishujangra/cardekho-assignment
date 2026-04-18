# Shortlists API

Base path: `/api/shortlists`

---

## `POST /api/shortlists`

Create a new shortlist.

**Request body**
```json
{
  "name": "Family SUVs under 20L",
  "car_ids": ["3", "9"]
}
```

**cURL**
```bash
curl -X POST http://localhost:8080/api/shortlists \
  -H "Content-Type: application/json" \
  -d '{"name": "Family SUVs under 20L", "car_ids": ["3", "9"]}'
```

**Response** — `201 Created`
```json
{
  "id": "20240419120000.000000000",
  "name": "Family SUVs under 20L",
  "car_ids": ["3", "9"],
  "created_at": "2024-04-19T12:00:00Z"
}
```

---

## `GET /api/shortlists`

List all shortlists (without car details).

**cURL**
```bash
curl http://localhost:8080/api/shortlists
```

**Response**
```json
[
  {
    "id": "20240419120000.000000000",
    "name": "Family SUVs under 20L",
    "car_ids": ["3", "9"],
    "created_at": "2024-04-19T12:00:00Z"
  }
]
```

---

## `GET /api/shortlists/:id`

Get a single shortlist with full car details embedded.

**cURL**
```bash
curl http://localhost:8080/api/shortlists/20240419120000.000000000
```

**Response**
```json
{
  "id": "20240419120000.000000000",
  "name": "Family SUVs under 20L",
  "car_ids": ["3", "9"],
  "created_at": "2024-04-19T12:00:00Z",
  "cars": [
    { "id": "3", "brand": "Tata", "model": "Nexon", ... },
    { "id": "9", "brand": "Hyundai", "model": "Creta", ... }
  ]
}
```

**404 — not found**
```json
{ "error": "shortlist not found" }
```

---

## `PUT /api/shortlists/:id`

Replace the name and car list of an existing shortlist.

**Request body**
```json
{
  "name": "Updated Name",
  "car_ids": ["3", "9", "7"]
}
```

**cURL**
```bash
curl -X PUT http://localhost:8080/api/shortlists/20240419120000.000000000 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "car_ids": ["3", "9", "7"]}'
```

**Response** — `200 OK` with the updated shortlist object.

---

## `DELETE /api/shortlists/:id`

Delete a shortlist.

**cURL**
```bash
curl -X DELETE http://localhost:8080/api/shortlists/20240419120000.000000000
```

**Response** — `204 No Content`
