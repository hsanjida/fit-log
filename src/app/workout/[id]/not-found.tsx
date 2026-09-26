import Link from "next/link";
export default function NotFoundWorkout() { return <main className="grid min-h-[65vh] place-items-center px-5 text-center"><div><p className="eyebrow">404 · lift not found</p><h1 className="display-font mt-4 text-5xl font-bold uppercase">No such workout</h1><Link href="/" className="btn mt-7 border-0 bg-lime text-black">Go to workouts</Link></div></main>; }
