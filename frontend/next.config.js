// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enables React's Strict Mode, which helps with highlighting potential issues in your app
    reactStrictMode: true,
  
    // Configuration for TypeScript
    typescript: {
      // Set to true if you want to ignore type errors and proceed with the build
      ignoreBuildErrors: false,
    },
  
    // Configuration for ESLint
    eslint: {
      // Set to true if you want to ignore ESLint errors and proceed with the build
      ignoreDuringBuilds: false,
    },
  
    // Setting for Webpack
    webpack: (config, { isServer }) => {
      // Example: Add custom plugins or loaders here
  
      // Handling file types like .svg as React components
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
  
    // Enables image optimization for domains (update with your domains)
    images: {
      domains: ['example.com'], // Replace 'example.com' with your allowed image domains
    },
  
    // Setting environment variables accessible in the browser
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Ensure to add necessary environment variables here
    },
  
    // Internationalization (i18n) configuration
    i18n: {
      locales: ['en-US', 'fr', 'de'], // Add your supported locales here
      defaultLocale: 'en-US',
    },
  
    // Enabling swcMinify for faster builds
    swcMinify: true,
  
    // Custom page extensions if using .page.tsx convention or similar
    pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  };
  
  module.exports = nextConfig;
  