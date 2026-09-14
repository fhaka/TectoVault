import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output produces a minimal, self-contained server bundle
  // (node_modules pruned to only what's actually used) — this is what the
  // Docker image below copies, instead of shipping the entire node_modules tree.
  output: "standalone",
};

export default nextConfig;
