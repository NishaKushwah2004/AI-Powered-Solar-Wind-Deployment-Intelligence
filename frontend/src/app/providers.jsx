import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { queryClient } from "./queryClient";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}

        <Toaster
          richColors
          position="top-right"
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}