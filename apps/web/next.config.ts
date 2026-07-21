import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Tell Turbopack the monorepo root so it doesn't complain about multiple lockfiles
    root: path.resolve(__dirname, "../.."),
  },
};

export default nextConfig;
