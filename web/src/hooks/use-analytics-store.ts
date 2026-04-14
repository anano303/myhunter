import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";

export interface AnalyticsData {
  pageViews: number;
  visitors: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  topSources: Array<{ source: string; visitors: number }>;
  errors?: {
    total: number;
    byType: Array<{ type: string; count: number }>;
  };
}

export interface DetailedErrorData {
  total: number;
  summary: Array<{
    type: string;
    count: number;
    uniqueErrors: number;
    details: Array<{
      message: string;
      endpoint: string;
      status: string;
      page: string;
      count: number;
    }>;
  }>;
  topFailingEndpoints: Array<{
    endpoint: string;
    count: number;
  }>;
  statusDistribution: Array<{
    status: string;
    count: number;
    category: string;
  }>;
  period: string;
}

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData>({
    pageViews: 0,
    visitors: 0,
    sessions: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    topPages: [],
    topSources: [],
  });

  const [detailedErrors, setDetailedErrors] =
    useState<DetailedErrorData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingErrors, setIsLoadingErrors] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (days: number = 7) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiClient.get(`/analytics/ga4?days=${days}`);
      const analyticsData = response.data;

      setData({
        pageViews:
          analyticsData.pageViews?.reduce(
            (sum: number, p: { views: number }) => sum + p.views,
            0,
          ) || 0,
        visitors: analyticsData.pageViews?.length || 0,
        sessions:
          analyticsData.userJourneys?.reduce(
            (sum: number, j: { count: number }) => sum + j.count,
            0,
          ) || 0,
        bounceRate: 0,
        avgSessionDuration: analyticsData.userJourneys?.[0]?.avgTime || 0,
        topPages: analyticsData.pageViews?.slice(0, 5) || [],
        topSources: [],
        errors: {
          total:
            analyticsData.errors?.reduce(
              (sum: number, e: { count: number }) => sum + e.count,
              0,
            ) || 0,
          byType: analyticsData.errors || [],
        },
      });

      setIsLoading(false);
    } catch (err: unknown) {
      console.error("Analytics fetch error:", err);
      const axiosErr = err as { response?: { data?: { message?: string } } };
      const msg =
        axiosErr?.response?.data?.message ||
        "ანალიტიკის მონაცემები ვერ ჩაიტვირთა";
      setError(msg);
      setIsLoading(false);
    }
  }, []);

  const fetchDetailedErrors = useCallback(
    async (errorType?: string, days: number = 7) => {
      try {
        setIsLoadingErrors(true);

        const response = await apiClient.get("/analytics/ga4/errors", {
          params: {
            days: days.toString(),
            ...(errorType && { errorType }),
          },
        });

        setDetailedErrors(response.data);
        setIsLoadingErrors(false);
      } catch (error) {
        console.error("Detailed errors fetch error:", error);
        setIsLoadingErrors(false);
      }
    },
    [],
  );

  return {
    data,
    detailedErrors,
    isLoading,
    isLoadingErrors,
    error,
    fetchAnalytics,
    fetchDetailedErrors,
  };
};
