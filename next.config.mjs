/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        webpackBuildWorker: false,
        cpus: 1,
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
};

export default nextConfig;
