import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cardapio-digital",
  assetPrefix: "/cardapio-digital/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
