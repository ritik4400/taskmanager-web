"use client";

import { useState } from "react";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApiError } from "@/lib/api/api-error";

// Any query or mutation that gets a 401 means the session is gone.
// /api/auth/expired clears the dead cookie and redirects to /login.
function redirectIfUnauthorized(error: unknown) {
  if (typeof window === "undefined") return;
  if (error instanceof ApiError && error.status === 401) {
    window.location.assign("/api/auth/expired");
  }
}

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({ onError: redirectIfUnauthorized }),
    mutationCache: new MutationCache({ onError: redirectIfUnauthorized }),
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: (failureCount, error) => {
          // 4xx means our request is wrong or we are not allowed, retrying will not help
          if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false;
          return failureCount < 1;
        },
      },
    },
  });
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState with a function creates the client once per browser session, not on every render
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
