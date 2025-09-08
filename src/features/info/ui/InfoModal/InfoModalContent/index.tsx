import Image from 'next/image'

import { Button } from '@/shared/ui/Button'

import './styles.scss'

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
		<div className="InfoModalContent">
			<div className="InfoModalContent__inner">
				<div className="InfoModalContent__image">
					{type === 'success' ? (
						<Image fill alt={successMessage} src="/images/Modal/success.png" />
					) : (
						<Image fill alt={failMessage} src="/images/Modal/fail.png" />
					)}
				</div>
				<div className="InfoModalContent__bottom">
					<span className="InfoModalContent__text">
						{type === 'success' ? successMessage : failMessage}
					</span>
					{type === 'success' ? (
						<Button
							className="InfoModalContent__btn"
							size="small"
							variant="primary"
							fullWidth
							onClick={onSuccess}>
							Хорошо
						</Button>
					) : (
						<Button className="InfoModalContent__btn" size="small" fullWidth onClick={onFail}>
							Вернуться к уроку
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
