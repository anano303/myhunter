import { ProductGrid } from "@/modules/products/components/product-grid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ProductsResponse } from "@/modules/products/api/get-products";

interface SearchPageProps {
  params: {
    keyword?: string;
  };
  searchParams: { page?: string };
}

export default async function SearchPage({
  searchParams,
  params,
}: SearchPageProps) {
  const { keyword } = params;
  const { page } = searchParams;
  const currentPage = Number(page) || 1;

  // Server-side fetch instead of using the client function
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const searchParams2 = new URLSearchParams({
    page: String(currentPage),
    limit: "12",
    ...(keyword ? { keyword } : {}),
  });

  const response = await fetch(
    `${baseUrl}/products?${searchParams2.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  // Format response to match ProductsResponse
  const productsData: ProductsResponse = {
    items: data.items || data.products || [],
    products: data.items || data.products || [],
    total: data.total || 0,
    page: data.page || 1,
    pages: data.pages || 1,
  };

  return (
    <div className="Container">
      <div className="py-10 space-y-8">
        <div className="flex items-center space-x-4">
          <button>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </button>
          <h1 className="text-2xl font-bold">Search Results: {keyword}</h1>
        </div>
        <ProductGrid
          products={productsData.items || []}
          searchKeyword={keyword}
          currentPage={currentPage}
          totalPages={productsData.pages}
        />
      </div>
    </div>
  );
}
