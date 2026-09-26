import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/workouts";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return <Link href={`/workout/${workout.id}`} className="workout-card group">
    <div className="relative aspect-[1.28] overflow-hidden bg-[#191a16]"><Image src={workout.image} alt={workout.name} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/><span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">{workout.difficulty}</span><div className="absolute bottom-4 left-4 flex flex-wrap gap-2">{workout.muscleGroups.slice(0, 3).map((group) => <span key={group} className="tag">{group}</span>)}</div></div>
    <div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="display-font text-xl font-bold uppercase tracking-wide text-white">{workout.name}</h3><p className="mt-1 text-sm text-zinc-500">{workout.equipment}</p></div><ArrowUpRight size={18} className="mt-1 shrink-0 text-zinc-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime"/></div><div className="mt-5 flex items-center gap-4 border-t border-white/[.07] pt-4 text-xs text-zinc-400"><span className="flex items-center gap-1.5"><Clock3 size={14}/>{workout.duration} min</span><span className="flex items-center gap-1.5"><Flame size={14}/>{workout.caloriesBurned} kcal</span><span className="ml-auto flex items-center gap-1.5 text-lime"><Star size={14} fill="currentColor"/>{workout.rating.toFixed(1)}</span></div></div>
  </Link>;
}
