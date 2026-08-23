"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { initAnalytics } from "@/lib/analytics";
import SmoothScrolling from "@/components/smooth-scrolling";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  // Load Google Analytics (gtag) once on mount, so a page view is recorded
  // even without any CTA interaction. No-ops during SSR and when disabled.
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScrolling>{children}</SmoothScrolling>
      <Toaster />
    </QueryClientProvider>
  );
}
