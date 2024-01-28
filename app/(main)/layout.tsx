"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { Navigation } from "./_components/navigation";
import { redirect } from "next/navigation";
import { SettingsModal } from "@/components/modals/settings-modal";
import { SearchModal } from "@/components/modals/search-modal";

const MainPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return ( 
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>
      <SearchModal />
    </div>
  );
}
 
export default MainPageLayout;