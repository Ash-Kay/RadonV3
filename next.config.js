module.exports = {
    images: {
        domains: ["radiumbucket.s3.ap-south-1.amazonaws.com", "localhost"],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};
