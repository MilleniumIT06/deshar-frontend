import Link from 'next/link'

import { Button } from '@/shared/ui/Button'

import './styles.scss'

export const AttestationResult = () => {
	return (
		<section className="AttestationResult">
			<div className="AttestationResult__inner">
				<div className="AttestationResult__content">
					<div className="points">
						<div className="points__content_wrapper">
							<div className="points__content">
								<span className="points__value">98</span>
								<span className="points__subtitle">баллов</span>
							</div>
						</div>
						<h6 className="AttestationResult__title">Вы успешно прошли модуль!</h6>
					</div>
					<div className="AttestationResult__btns">
						<Button
							asChild
							size="small"
							variant="primary"
							className="AttestationResult__btn"
							fullWidth>
							<Link href="/dashboard">Следующий модуль</Link>
						</Button>

						<Button
							asChild
							variant="secondary"
							size="small"
							fullWidth
							className="AttestationResult__btn">
							<Link href="/dashboard">Вернуться в профиль</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
