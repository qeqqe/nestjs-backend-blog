import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
      <div className="max-w-lg mx-4 text-center space-y-8">
        <h1 className="text-6xl font-normal tracking-tight text-white font-mono">
          write<span className="text-neutral-600">.</span>
        </h1>

        <p className="text-lg text-neutral-400 font-light tracking-wide">
          Same fucking blog app for the millionth time but w new framework
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-neutral-200 font-medium transition-colors"
            >
              Start writing
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button
              size="lg"
              variant="bordered"
              className="border-neutral-800 text-neutral-300 hover:border-neutral-700"
            >
              Sign in
            </Button>
          </Link>
        </div>

        <p className="text-sm text-neutral-600 pt-4 font-mono">
          No distractions. Just write.
        </p>
      </div>
    </main>
  );
}
