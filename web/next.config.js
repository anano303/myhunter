/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable Next.js/Vercel Image Optimization.
    // Images are already optimized by Cloudinary at upload time
    // (q_auto,f_auto,w_1024 / w_1920), so re-optimizing on Vercel is
    // redundant, burns the Vercel image quota (causes 402 Payment Required),
    // and does NOT increase Cloudinary usage — the pre-generated variant is
    // served directly from the Cloudinary CDN.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
    ],
    // Enable lazy loading by default
    loader: "default",
    // Enable blur placeholder
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Enable webpack bundle analyzer in development
  webpack: (config, { dev, isServer }) => {
    // Bundle analyzer for development
    if (dev && !isServer && process.env.ANALYZE === "true") {
      config.plugins.push(
        new (require("webpack-bundle-analyzer").BundleAnalyzerPlugin)({
          analyzerMode: "server",
          openAnalyzer: false,
        })
      );
    }
    return config;
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["@tanstack/react-query", "framer-motion"],
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.js",
      },
    },
  },
  // Headers for caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=300",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
