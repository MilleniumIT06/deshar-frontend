import { AttestationResult } from '@/components/AttestationResult'

import styles from './../styles.module.scss'

export default async function AttestationResultPage() {
	return (
		<main className={styles.main}>
			<AttestationResult />
		</main>
	)
}
