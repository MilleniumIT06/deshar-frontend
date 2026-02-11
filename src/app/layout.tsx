import { Roboto, Unbounded } from 'next/font/google'

import { StoreProvider } from './_providers/StoreProvider'

import type { Metadata } from 'next'

import './globals.scss'

const roboto = Roboto({
	variable: '--font-roboto-sans',
	subsets: ['latin'],
})
const unbounded = Unbounded({
	variable: '--font-unbounded-sans',
	subsets: ['latin'],
})
export const metadata: Metadata = {
	title: 'Desharing',
	description: 'Описание сайта',
	manifest: '/site.webmanifest',
	icons: {
		icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
		apple: [{ url: '/apple-touch-icon.png' }],
		other: [
			{
				rel: 'icon',
				url: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				rel: 'icon',
				url: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} ${unbounded.variable}`}>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	)
}
