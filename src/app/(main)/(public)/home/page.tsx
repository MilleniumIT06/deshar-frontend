import dynamic from 'next/dynamic'

import { Info } from '@/components/Info'
import { Hero } from '@/widgets/Hero/ui/Hero'
import { Learn } from '@/widgets/Learn'

const Reviews = dynamic(() => import('@/widgets/Reviews').then(mod => mod.Reviews), {
	// ssr: false,
	loading: () => <div>Загрузка...</div>,
})
const Subscription = dynamic(() => import('@/widgets/Subscription').then(mod => mod.Subscription), {
	// ssr: false,
	loading: () => <div>Загрузка...</div>,
})
const Question = dynamic(() => import('@/components/Question').then(mod => mod.Question), {
	// ssr: false,
	loading: () => <div>Загрузка...</div>,
})
export default async function Home() {
	return (
		<main className="mRelative">
			<Hero />
			<Info />
			<Learn />
			<Reviews />
			<Subscription />
			<Question />
		</main>
	)
}
