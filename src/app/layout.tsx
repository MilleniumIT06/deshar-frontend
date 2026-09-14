import { Montserrat, Roboto, Unbounded } from 'next/font/google'

import { Providers } from './_providers/providers'

import type { Metadata } from 'next'
import './globals.scss'

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-monserrat',
})
const roboto = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '700'],
	variable: '--font-roboto-sans',
})
const unbounded = Unbounded({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-unbounded-sans',
})

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://desharing.ru'),
	title: {
		default: 'Desharing — Интерактивная образовательная платформа в Ингушетии',
		template: '%s | Desharing',
	},
	description:
		'Современная образовательная платформа в Ингушетии. Интерактивный курс по ингушскому языку и школьным предметам для школьников и студентов. Изучайте легко!',
	keywords: ['Ингушский язык', 'Изучить Ингушский Язык', 'курс по Ингушскому языку', 'Ингушетия', 'Desharing', 'интерактивное обучение'],
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
	openGraph: {
		title: 'Desharing — Интерактивное обучение в Ингушетии',
		description: 'Интерактивные курсы по ингушскому языку и школьным предметам для школьников и студентов с интересными игровыми механиками.',
		url: './',
		siteName: 'Desharing',
		locale: 'ru_RU',
		type: 'website',
		images: [
			{
				url: '/opengraph-image.png',
				width: 1200,
				height: 630,
				alt: 'Платформа Desharing',
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
		<html lang="ru">
			<body className={`${roboto.variable} ${unbounded.variable} ${montserrat.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
