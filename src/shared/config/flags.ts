import { flag } from 'flags/next'

export const subscriptionFeat = flag({
	key: 'subscription',
	decide: () => process.env.SHOW_SUBSCRIPTION === 'TRUE',
})
