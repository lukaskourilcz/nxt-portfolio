import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundGrid } from "@/components/background-grid";
import { Button } from "@/components/ui/button";

export const metadata = { title: "404 — Not Found" };

export default function NotFound() {
  return (
    <>
      <BackgroundGrid />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-emerald-400 light:text-emerald-600">
          $ cd /page
        </p>
        <h1 className="mt-4 font-mono text-7xl font-bold tracking-tight text-zinc-100 light:text-zinc-900">
          404
        </h1>
        <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-zinc-400 light:text-zinc-600">
          Error: route not found. That path doesn&apos;t exist, head back home.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </Button>
      </main>
    </>
  );
}
