# Flight Book

Full-stack flight booking app with:
- Node.js + Express backend
- Expo React Native mobile app
- PostgreSQL with Prisma

## Project Structure

- `Flight_Book/` - backend API
- `Flight_Book/mobile-app/` - Expo mobile client

## Backend Setup

From `Flight_Book/`:

1. Install dependencies:
   - `npm install`
2. Configure environment:
   - Copy `.env.example` to `.env`
   - Fill database and API keys
3. Start server:
   - `npm run dev`

Default backend URL: `http://localhost:5000`

## Mobile App Setup

From `Flight_Book/mobile-app/`:

1. Install dependencies:
   - `npm install`
2. Configure API base URL (optional but recommended):
   - Copy `.env.example` to `.env`
   - Update `EXPO_PUBLIC_API_BASE_URL` for your backend host/IP
3. Start Expo:
   - `npx expo start --host lan`

Open in Expo Go on your phone by scanning the QR code.

## API Endpoints (Quick Check)

- `GET /api/test` - basic API check
- `GET /api/health` - health and uptime check

