"use client";

import { useConvexAuth } from "convex/react";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="flex flex-col items-center justify-center max-w-3xl space-y-8">
      <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl">
        Welcome to OVK's notes app. Note taking made easy by <span className="underline">Fable</span>.
      </h1>
      <h3 className="text-base font-medium pt-2 sm:text-xl md:text-2xl">
        It's a online workspace for your important snippets of data.
      </h3>
      {isLoading && (
        <Spinner size="lg" />
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get access <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Fable <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
    </div>
  );
};