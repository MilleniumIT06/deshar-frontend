import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**', // разрешает все HTTPS хосты
			},
			{
				protocol: 'http',
				hostname: '**', // разрешает все HTTP хосты
			},
		],
	},
	/* config options here */
}

export default nextConfig
