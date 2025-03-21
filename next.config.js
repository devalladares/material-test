/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
  // Ensure that Webpack handles the canvas properly
  webpack: (config) => {
    return config;
  },
  // Turbopack configuration
  experimental: {
    turbo: {
      // This disables tree shaking which can cause issues with certain modules
      treeShaking: false,
      // Increase memory limit if needed
      memoryLimit: 4000 * 1024 * 1024, // 4GB
      // Configure rules for handling different file types (if needed)
      rules: {
        // Add any specific file type rules here if needed
      },
    },
  }
};

module.exports = nextConfig; 