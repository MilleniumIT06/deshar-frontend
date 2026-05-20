'use client'

import { useState, type ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'

import { store } from '../_store'
import { domAnimation, LazyMotion } from 'motion/react'

export const Providers = ({ children }: { children: ReactNode }) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		}),
	)
	return (
		<QueryClientProvider client={client}>
			<Provider store={store}>
				<LazyMotion features={domAnimation}>{children}</LazyMotion>
			</Provider>
		</QueryClientProvider>
	)
}
