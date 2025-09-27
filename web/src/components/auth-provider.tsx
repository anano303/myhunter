"use client";

import { useQuery } from "@tanstack/react-query";
import { userQueryConfig } from "@/modules/auth/user-config";
import { useTokenExpiry } from "@/hooks/use-token-expiry";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useQuery({
    ...userQueryConfig,
    enabled: true,
  });

  // Check token expiry periodically
  useTokenExpiry();

  return <>{children}</>;
}
