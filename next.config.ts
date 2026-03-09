import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static optimization globally to avoid workUnitAsyncStorage
  // prerendering errors with Supabase client in Next.js 16
  staticPageGenerationTimeout: 60,
};

export default nextConfig;
