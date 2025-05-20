import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://effective-system-5457w65966qf77x5-8443.app.github.dev",
        "http://localhost:3000",
        "http://localhost:8443"
      ]
    }
  }
};

module.exports = nextConfig