import FullScreenMenu from '@/components/FullScreenMenu'
import { Hero } from '@/components/Hero'
import { Info } from '@/components/Info'
import { Learn } from '@/components/Learn'
import { Question } from '@/components/Question'
import { Reviews } from '@/components/Reviews'
import { Subscription } from '@/components/Subcription'

export default function Home() {
	return (
		<main className="mRelative">
			<FullScreenMenu />
			<Hero />
			<Info />
			<Learn />
			<Reviews />
			<Subscription />
			<Question />
		</main>
	)
}
