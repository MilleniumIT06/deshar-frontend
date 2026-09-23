import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ui-avatars.com',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost', // Если локальный бекенд, укажите его хост (например, localhost или 127.0.0.1)
				port: '8000', // Укажите порт вашего бекенда, если он есть
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: '://yourbackend.com', // Если продакшн-бекенд, укажите его домен здесь
				pathname: '/**',
			},
		],
	},
	typescript: {
		ignoreBuildErrors: false,
	},
	/* config options here */
}

export default nextConfig
