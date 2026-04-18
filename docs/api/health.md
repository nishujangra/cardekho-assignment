# Health Check

## `GET /health`

Returns the server status. Use this to verify the backend is running.

**Response**
```json
{ "status": "ok" }
```

**cURL**
```bash
curl http://localhost:8080/health
```
