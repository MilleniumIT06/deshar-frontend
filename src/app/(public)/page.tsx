import dynamic from 'next/dynamic'

import { Hero } from '@/components/Hero'
import { Info } from '@/components/Info'
import { Learn } from '@/components/Learn'

const Reviews = dynamic(() => import('@/components/Reviews').then(mod => mod.Reviews), {
	loading: () => <div>Загрузка...</div>,
})
const Subscription = dynamic(() => import('@/components/Subcription').then(mod => mod.Subscription), {
	loading: () => <div>Загрузка...</div>,
})
const Question = dynamic(() => import('@/components/Question').then(mod => mod.Question), {
	loading: () => <div>Загрузка...</div>,
})
export default function Home() {
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
