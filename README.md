# FitLog — Workout Library

FitLog is a responsive workout library and daily training log. Browse exercises, check their instructions and stats, then add lifts to today’s plan or save them for later.

## Links

- **Live app:** [fit-log-theta-two.vercel.app](https://fit-log-theta-two.vercel.app/)
- **GitHub repository:** [hsanjida/fit-log](https://github.com/hsanjida/fit-log)

## Technologies

- Next.js App Router and React
- TypeScript
- Tailwind CSS 4 and DaisyUI 5
- Lucide icons
- FitLog workout API
- Browser localStorage for plan persistence

## Features

- Responsive library of workouts from the FitLog API, with duration, calorie, and rating sorting
- Workout detail pages with muscle groups, equipment, difficulty, sets, reps, and step-by-step instructions
- Independent **Today’s Plan** and **Saved** lists, with counters in the navigation
- A five-workout limit, live exercise/minute/calorie totals, and Mark as Done and remove actions
- Toast feedback when workouts are added, saved, completed, or removed
- Plan and saved workouts persist after reloads; loading and not-found pages are included

## Getting started

Install the project dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create a production build, run `npm run build`, then `npm start` to serve it locally.

## Workout API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- One workout: `https://api.abcz.workers.dev/api/fitlog/:id`

The home page and detail routes fetch workout data on the server. The My Plan page uses the local `/api/workouts` route to load the list for saved and planned workout IDs.

## Project structure

```text
src/
├── app/                 # App Router pages, loading UI, API route, and styles
├── components/
│   ├── home/            # Hero, library, and workout cards
│   ├── layout/          # Navbar and footer
│   ├── my-plan/         # Plan and saved list UI
│   ├── providers/       # Client state provider
│   └── workout/         # Workout detail actions
├── context/             # Plan and saved state
└── lib/                 # API functions, types, and icons
public/assets/           # FitLog logo and hero artwork
```
