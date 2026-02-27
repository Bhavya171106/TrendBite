# Hyper-Local Food Trend Agent

Production-structured hackathon starter for restaurant trend analytics.

## Stack
- Backend: Node.js + Express
- Database: MySQL
- Frontend: HTML + CSS + JS
- AI Layer: Mock AI recommendation logic (can swap for OpenAI)

## Quick Start
1. Create MySQL database and table using `sql/schema.sql`.
2. Copy `.env.example` to `.env` and update credentials.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start server:
   ```bash
   npm run dev
   ```
5. Open dashboard:
   - `http://localhost:3000/`
6. Create users table for auth (one time):
   - Run `sql/add_users_table.sql`

## APIs
- `POST /api/auth/register` (no API key, required: `name`, `restaurantName`, `location`, `email`, `password`)
- `POST /api/auth/login` (no API key)
- `POST /api/add-food`
- `POST /api/ingest-csv` (multipart form field name: `file`)
- `POST /api/seed-live-locations` (optional body: `{ "rowsPerLocation": 18 }`)
- `GET /api/dashboard?location=Hyderabad`
- `GET /api/locations` (live locations with recent post counts)
- All endpoints above require header: `x-api-key: <API_KEY>`

## Notes
- Dashboard auto-refreshes every 5 seconds.
- Revenue model: `trendScore * weekendMultiplier * priceEstimate`.
- AI recommendation service currently uses local trend logic and deterministic generation.
- Optional sample data: `node scripts/generateSampleCsv.js`
- Seed multi-city live data: `npm run seed:live`
- Auth pages: `/login.html`, `/register.html`
