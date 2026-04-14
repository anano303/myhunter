"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import AnalyticsDashboard from "@/components/analytics-dashboard/analytics-dashboard";

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login?redirect=/admin/analytics");
      return;
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div className="loading-container">იტვირთება...</div>;
  }

  return (
    <div
      className="responsive-container"
      style={{ maxWidth: "90%", margin: "0 auto", padding: "2rem 0" }}
    >
      <AnalyticsDashboard />
    </div>
  );
}
