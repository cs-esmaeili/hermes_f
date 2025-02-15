/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'back.hermes.ir',
            },
            {
                protocol: 'http',
                hostname: 'back.hermes.ir',
            },
            {
                protocol: 'https',
                hostname: 'www.back.hermes.ir',
            },
            {
                protocol: 'http',
                hostname: 'www.back.hermes.ir',
            },
        ],
    },
};

export default nextConfig;
