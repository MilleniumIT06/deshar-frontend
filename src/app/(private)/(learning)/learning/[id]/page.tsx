import { LearningContent } from '@/components/LearningContent'

import styles from './../../../styles.module.scss'

export default async function Learning() {
	return (
		<main className={styles.main}>
			<LearningContent />
		</main>
	)
}
