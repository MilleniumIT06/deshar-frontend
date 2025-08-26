import cn from 'classnames'

import styles from './styles.module.scss'

export const AttestationBar = ({ points, status }: { points: number; status: 'checking' | 'checked' }) => {
	return (
		<div className={styles.AttestationBar}>
			{status === 'checked' && <span className={styles.AttestationBar__number}>{points}</span>}
			<div
				className={cn(
					styles.AttestationBar__line,
					status === 'checking' ? styles.checking : styles.checked,
				)}
			/>
		</div>
	)
}
