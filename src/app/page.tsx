import { Info, Learn, Subscription, Question } from '@/components'
import { Hero } from '@/widgets/Home/Hero'
import { Reviews } from '@/widgets/Reviews'

import styles from './page.module.scss'

export default function Home() {
	return (
		<main className={styles.main}>
			<Hero />
			<Info />
			<Learn />
			<Reviews />
			<Subscription />
			<Question />
		</main>
	)
}
