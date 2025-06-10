"use client";

import type { Product } from "@/types";

export interface ProductsResponse {
  items?: Product[];
  products?: Product[];
  total: number;
  page: number;
  pages: number;
}

// Function that can be used in both client and server components
export async function getProducts(
  page = 1,
  limit = 10,
  params?: Record<string, string>
): Promise<ProductsResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(params || {}),
  });

  try {
    // Use standard fetch API which works in both client and server
    const response = await fetch(
      `${baseUrl}/products?${searchParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    // Ensure consistent response structure
    return {
      items: data.items || data.products || [],
      products: data.items || data.products || [],
      total: data.total || 0,
      page: data.page || 1,
      pages: data.pages || 1,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      items: [],
      products: [],
      total: 0,
      page: 1,
      pages: 1,
    };
  }
}
