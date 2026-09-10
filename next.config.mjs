/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Photos are posted as base64 JSON payloads; allow a realistic phone photo through.
  experimental: { serverActions: { bodySizeLimit: '12mb' } },
};

export default nextConfig;
