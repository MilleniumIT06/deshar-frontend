import Image from 'next/image'

import { Button } from '@/shared/ui/Button'

import styles from './styles.module.scss'

export const InfoModalContent = ({
	type = 'success',
	successMessage = 'Вы успешно выполнили задание. Продолжайте в том же духе!',
	failMessage = 'Задание выполнено неправильно. Прочтите урок и попробуйте еще раз.',
	onSuccess,
	onFail,
}: {
	type: 'success' | 'fail'
	successMessage?: string
	failMessage?: string
	onSuccess: () => void
	onFail: () => void
}) => {
	return (
		<div className={styles.index}>
			<div className={styles.index__inner}>
				<div className={styles.index__image}>
					{type === 'success' ? (
						<Image fill alt={successMessage} src="/images/Modal/success.png" />
					) : (
						<Image fill alt={failMessage} src="/images/Modal/fail.png" />
					)}
				</div>
				<div className={styles.index__bottom}>
					<span className={styles.index__text}>{type === 'success' ? successMessage : failMessage}</span>
					{type === 'success' ? (
						<Button
							className={styles.index__btn}
							size="small"
							variant="primary"
							fullWidth
							onClick={onSuccess}>
							Хорошо
						</Button>
					) : (
						<Button className={styles.index__btn} size="small" fullWidth onClick={onFail}>
							Вернуться к уроку
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
