## Funkcionalnosti

- CRUD operacije nad zadacima (kreiranje, čitanje, izmena, brisanje)
- Filtriranje po statusu (aktivno / završeno) i pretraga po nazivu
- Prioriteti zadataka (nizak / srednji / visok) i opcioni rok
- REST API napisan u Express + TypeScript, sa jednostavnom JSON perzistencijom
- Frontend u React + TypeScript + Tailwind CSS, sa tipiziranim API klijentom

## Tech stack

- **Backend:** Node.js, Express, TypeScript
- **Frontend:** React, TypeScript, Tailwind CSS, Vite

## Pokretanje

### Backend

```bash
cd backend
npm install
npm run dev
```

Server se pokreće na `http://localhost:4000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplikacija se pokreće na `http://localhost:5173` (Vite dev server proksira
`/api` pozive ka backend-u).

## API rute

| Metoda | Ruta              | Opis                                  |
|--------|-------------------|----------------------------------------|
| GET    | /api/tasks        | Lista zadataka (query: status, priority, search) |
| GET    | /api/tasks/:id    | Jedan zadatak                          |
| POST   | /api/tasks        | Kreiranje zadatka                      |
| PUT    | /api/tasks/:id    | Izmena zadatka                         |
| DELETE | /api/tasks/:id    | Brisanje zadatka                       |
| GET    | /api/stats        | Statistika (ukupno / završeno / aktivno) |

## Ideje za dalje (ako želiš da ga proširiš)

- Autentifikacija (JWT) i zadaci po korisniku
- Prava baza (SQLite / PostgreSQL) umesto JSON fajla
- Kategorije/tagovi za zadatke
- Deploy (Render/Railway za backend, Vercel/Netlify za frontend) i link u CV-ju

## Predlog opisa za CV

> **TaskFlow — Full-stack Task Manager**
> Personal project: React/TypeScript frontend and Express/Node.js REST API,
> styled with Tailwind CSS. Implements full CRUD, filtering, search, and task
> prioritization with a typed API client shared between frontend and backend.
> [GitHub link]
