import { useEffect } from "react";
import { useAuth } from "./use-auth";
import {
  isTokenExpired,
  clearTokens,
  getAccessToken,
  getTokenTimeRemaining,
} from "@/lib/auth";
import { toast } from "./use-toast";

export function useTokenExpiry() {
  const { user, logout } = useAuth();

  useEffect(() => {
    // Only run if user is logged in
    if (!user) return;

    const checkTokenExpiry = () => {
      const token = getAccessToken();

      // If no token, user should already be logged out
      if (!token) {
        if (user) {
          console.log("No token found, logging out...");
          toast({
            title: "სესია დასრულდა",
            description: "გთხოვთ თავიდან შეხვიდეთ",
            variant: "destructive",
          });
          clearTokens();
          logout();
        }
        return;
      }

      // Check if token is expired (use isTokenExpired for immediate logout)
      if (isTokenExpired()) {
        console.log("Token expired, logging out...");
        toast({
          title: "სესია ვადაგასულია",
          description: "გთხოვთ თავიდან შეხვიდეთ სისტემაში",
          variant: "destructive",
        });
        clearTokens();
        logout();
        return;
      }

      // Log remaining time for debugging (can be removed in production)
      const timeRemaining = getTokenTimeRemaining();
      const daysRemaining = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
      const hoursRemaining = Math.floor(
        (timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      console.log(`Token expires in: ${daysRemaining}d ${hoursRemaining}h`);
    };

    // Check immediately
    checkTokenExpiry();

    // Check every 5 minutes for expired tokens
    const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user, logout]);
}
