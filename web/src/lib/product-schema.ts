interface Product {
  name: string;
  description?: string;
  brand: string;
  images?: string[];
  sku?: string;
  gtin?: string;
  barcode?: string;
  price: number;
  availability: boolean;
  averageRating?: number;
  reviewsCount?: number;
  mainCategory?: { name: string; _id: string };
  hashtags?: string[];
  mpn?: string;
  model?: string;
  color?: string;
  size?: string;
  material?: string;
  weight?: string;
}

export function generateProductSchema(product: Product, productId: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_PRODUCTION_URL || "https://myhunter.ge";

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description || `${product.name} by ${product.brand}`,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    image: product.images?.map((img: string) => img) || ["/logo.png"],
    sku: product.sku || productId,
    gtin: product.gtin || product.barcode,
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/products/${productId}`,
      priceCurrency: "GEL",
      price: product.price,
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(), // 1 წელი
      availability: product.availability
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "MyHunter",
        url: baseUrl,
      },
    },
    aggregateRating:
      product.averageRating && product.reviewsCount
        ? {
            "@type": "AggregateRating",
            ratingValue: product.averageRating,
            reviewCount: product.reviewsCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    category: product.mainCategory?.name || "Hunting Equipment",
    additionalProperty:
      product.hashtags?.map((tag: string) => ({
        "@type": "PropertyValue",
        name: "hashtag",
        value: tag,
      })) || [],
    manufacturer: {
      "@type": "Organization",
      name: product.brand,
    },
    mpn: product.mpn || product.model,
    color: product.color,
    size: product.size,
    material: product.material,
    weight: product.weight,
    url: `${baseUrl}/products/${productId}`,
  };
}

export function generateBreadcrumbSchema(product: Product, productId: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_PRODUCTION_URL || "https://myhunter.ge";

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "მთავარი",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "მაღაზია",
      item: `${baseUrl}/shop`,
    },
  ];

  if (product.mainCategory?.name) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: product.mainCategory.name,
      item: `${baseUrl}/shop?category=${product.mainCategory._id}`,
    });
  }

  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: product.name,
    item: `${baseUrl}/products/${productId}`,
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}
