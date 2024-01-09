"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scrolled-top";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/spinner";

export const Navbar = () => {
  const scrolled = useScrollTop();

  const { isAuthenticated, isLoading } = useConvexAuth();

  return ( 
    <div className={cn(
      "top-0 fixed w-full z-50 bg-background flex p-6 items-center dark:bg-[#1F1F1F]",
      scrolled && "border-b shadow-sm"
    )}>
      <div className="flex ml-auto items-center justify-center md:justify-end gap-x-2">
        {isLoading && (
          <Spinner />
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">
                Sign up
              </Button>
            </SignUpButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost">
              Enter Fable
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
