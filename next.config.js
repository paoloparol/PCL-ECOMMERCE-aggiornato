/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  experimental: {
    typedRoutes: false
  },
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: false,
  cleanDistDir: true,
  webpack: (config, { dev, isServer }) => {
    // Apply custom webpack config for Netlify if on Netlify
    if (process.env.NETLIFY) {
      const netlifyConfig = require('./netlify.webpack.config.js');
      Object.assign(config, netlifyConfig);
    }
    return config;
  }
};

module.exports = withBundleAnalyzer(nextConfig);