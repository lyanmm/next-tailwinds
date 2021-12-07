module.exports = {
  basePath: process.env.NEXT_PUBLIC_ENV === 'dev' ? '' : '/home',
  reactStrictMode: true,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // loader: 'custom',
  },
}
