"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/lib/workouts";

type SortKey = "duration" | "caloriesBurned" | "rating";
export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortKey>("duration");
  const [search, setSearch] = useState("");
  useEffect(() => { fetch("/api/workouts").then((response) => { if (!response.ok) throw new Error("Workout request failed"); return response.json() as Promise<Workout[]>; }).then(setWorkouts).catch(() => setWorkouts([])).finally(() => setLoading(false)); }, []);
  const visible = useMemo(() => workouts.filter((item) => `${item.name} ${item.muscleGroups.join(" ")}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => a[sort] - b[sort]), [workouts, sort, search]);
  return <section id="library" className="scroll-mt-28 py-20 sm:py-24"><div className="mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow">Pick your next move</p><h2 className="display-font mt-3 text-4xl font-extrabold uppercase sm:text-5xl">The <span className="text-lime">Library</span></h2><p className="mt-3 text-sm text-zinc-400">Twelve lifts covering every major muscle group.</p></div><div className="flex flex-col gap-3 sm:flex-row"><label className="input input-bordered flex items-center gap-2 border-white/10 bg-white/[.04] text-zinc-300"><Search size={16}/><input aria-label="Search workouts" placeholder="Search lifts or muscle group" value={search} onChange={(event) => setSearch(event.target.value)} className="w-full sm:w-52"/></label><label className="select select-bordered flex items-center gap-2 border-white/10 bg-white/[.04] text-zinc-200"><SlidersHorizontal size={15}/><span className="sr-only">Sort by</span><select aria-label="Sort by" value={sort} onChange={(event) => setSort(event.target.value as SortKey)}><option value="duration">Sort: Duration</option><option value="caloriesBurned">Sort: Calories</option><option value="rating">Sort: Rating</option></select></label></div></div>
    {loading ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <div key={i} className="skeleton h-[340px] bg-white/[.06]"/>)}</div> : visible.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map((workout) => <WorkoutCard key={workout.id} workout={workout}/>)}</div> : <div className="rounded-2xl border border-white/10 p-10 text-center text-zinc-400">No workouts found. Check your connection or change your search.</div>}
  </section>;
}
