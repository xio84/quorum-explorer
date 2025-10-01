/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

// Define your Next.js configuration object here
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  publicRuntimeConfig: {
    DISABLE_AUTH: process.env.DISABLE_AUTH,
    QE_BASEPATH: process.env.QE_BASEPATH,
  },
  experimental: { esmExternals: true },
  basePath: process.env.QE_BASEPATH,
  reactStrictMode: true,
  async redirects() {
    // Use `this` for the final config object, not `nextConfig`
    if (this.basePath === "") {
      return [
        {
          source: "/",
          destination: "/nodes",
          basePath: false,
          permanent: false,
        },
      ];
    } else {
      return [
        {
          source: "/",
          destination: this.basePath + "/nodes",
          basePath: false,
          permanent: false,
        },
        {
          source: "/api/:path*",
          destination: this.basePath + "/api/:path*",
          basePath: false,
          permanent: false,
        },
        {
          source: this.basePath,
          destination: this.basePath + "/nodes",
          basePath: false,
          permanent: false,
        },
      ];
    }
  },
};

// Pass your config object into the removeImports function
module.exports = removeImports(nextConfig);
