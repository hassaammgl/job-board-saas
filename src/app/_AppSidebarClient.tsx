"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

export function AppSidebarClient({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <div className="p-2 border-b flex items-center gap-1">
          <SidebarTrigger />
          <span className="text-xl text-nowrap">RAT Jobs</span>
        </div>
        <div className="flex flex-1">
          {children}
        </div>
      </div>
    );
  }
  return children;
}
