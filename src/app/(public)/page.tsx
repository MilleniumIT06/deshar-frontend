import { Hero } from '@/components/Hero'
import { Info } from '@/components/Info'
import { Learn } from '@/components/Learn'
import { Question } from '@/components/Question'
import { Reviews } from '@/components/Reviews'
import { Subscription } from '@/components/Subcription'

import styles from './../page.module.scss'

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
