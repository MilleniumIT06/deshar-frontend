import { flag } from 'flags/next'

export const showBanner = flag({
	key: 'banner',
	decide: () => process.env.SHOW_BANNER === 'true', // Can use env vars, or call a provider
})
