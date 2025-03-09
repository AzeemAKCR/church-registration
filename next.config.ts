import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset/resource'
    });
    return config;
  },
  images: {
    unoptimized: true
  },
  devIndicators: false
};

export default nextConfig;
