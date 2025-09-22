"use client";

import React, { Suspense } from "react";
import { ClerkProvider as OrignalClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useIsDarkMode();

  return (
    <Suspense>
      <OrignalClerkProvider
        appearance={isDarkMode ? { baseTheme: [dark] } : undefined}
      >
        {children}
      </OrignalClerkProvider>
    </Suspense>
  );
}
