import { LearningAttestation } from '@/components/LearningAttestation'

import styles from './../../styles.module.scss'

export default async function Attestation() {
	return (
		<main className={styles.main}>
			<LearningAttestation />
		</main>
	)
}
