import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-violet-800 to-blue-900">
      <Card className="w-full max-w-lg mx-4 p-8 bg-black/40 backdrop-blur-md border border-white/10">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to Blogify
          </h1>

          <p className="text-lg text-gray-300">
            Share your stories, ideas, and experiences with the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="border-white/30 text-white"
            >
              Sign In
            </Button>
          </div>

          <p className="text-sm text-gray-400 mt-8">
            Join our community of writers and readers today!
          </p>
        </div>
      </Card>
    </main>
  );
}
