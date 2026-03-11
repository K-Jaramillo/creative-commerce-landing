/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@creative-commerce/ui',
    '@creative-commerce/database',
    '@creative-commerce/ai',
    '@creative-commerce/types',
  ],
};

export default nextConfig;
