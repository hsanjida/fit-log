# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of twelve
lifts, open a workout to see full instructions and key specs, then add lifts to
today's plan or save them for later — all tracked live in the navbar.
## Live Link


## Technologies used

- Next.js (App Router) + TypeScript
- React
- Tailwind CSS v4 + daisyUI v5
- FitLog REST API (`api.abcz.workers.dev/api/fitlog`)
- Browser `localStorage` for persisting the plan/saved state

## Features

1. Responsive workout library with a live **Sort By** (Duration / Calories / Rating) control.
2. Workout detail pages with key specs, step-by-step instructions, and add-to-plan / save-for-later actions.
3. **My Plan** page with live Exercises/Minutes/Calories metrics, Today's Plan and Saved tabs, mark-as-done, and remove.
4. Navbar badges that reflect the live Plan/Saved counts from anywhere in the app.
5. Toast notifications for every plan/saved action, a custom 404 page, and loading states on the Home and My Plan pages.
6. Plan and Saved lists persist across reloads via `localStorage`.






