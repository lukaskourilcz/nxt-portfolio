import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundGrid } from "@/components/background-grid";

export const metadata = { title: "404 — Not Found" };

export default function NotFound() {
  return (
    <>
      <BackgroundGrid />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-emerald-400">$ cd /page</p>
        <h1 className="mt-4 font-mono text-7xl font-bold tracking-tight text-zinc-100">
          404
        </h1>
        <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-zinc-400">
          Error: route not found. The page you&apos;re looking for doesn&apos;t
          exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </main>
    </>
  );
}
