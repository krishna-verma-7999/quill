/** @type {import('next').NextConfig} */
const nextConfig = {

    // for redirection 
    async redirects() {
        return [
            {
                source: '/sign-in',
                destination: '/api/auth/login',
                permanent: true
            },
            {
                source: '/sign-up',
                destination: '/api/auth/register',
                permanent: true
            },
            {
                source: '/sign-out',
                destination: '/api/auth/logout',
                permanent: true
            },
        ]
    },

    // for rendering your pdf
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
    },

    // for image url
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/*',
            },
        ],
    },
}

module.exports = nextConfig
