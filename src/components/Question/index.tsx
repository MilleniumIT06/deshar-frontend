import { Button } from '@/shared/ui/Button'

import './styles.scss'

export const Question = () => {
	return (
		<section className="Question">
			<div className="container">
				<div className="Question__inner">
					<h3 className="Question__title">Остались вопросы&nbsp;&mdash; ответим!</h3>
					<Button variant="primary" size="big" className="Question__btn">
						Задать вопрос
					</Button>
				</div>
			</div>
		</section>
	)
}
