/* eslint-disable @next/next/no-img-element */
'use client'
import Image from 'next/image'
import { EngineButton } from '../Button'
import { useAppSelector } from '@/app/_store/hooks'

import './styles.scss'
import { FinishBtn } from '../FinishBtn'

export const EngineFinishScreen = () => {
	const { totalScore } = useAppSelector(state => state.scoreReducer)

	return (
		<section className="finish-screen">
			<FinishBtn handleClick={() => 'test'} className="finish-screen__close-btn" />

			<div className="finish-screen__container">
				<div className="finish-screen__content">
					{/* Иконка коробки */}
					<div className="finish-screen__box-icon">
						<Image width={141} height={141} src="/box.png" alt="Finish box" quality={100} />
					</div>

					{/* Полоса прогресса цели */}
					<div className="finish-screen__goal-progress">
						<div className="finish-screen__goal-bar" style={{ width: '50%' }}>
							<div className="finish-screen__goal-inner" />
						</div>
					</div>

					<h2 className="finish-screen__score-title">
						Ты заработал {totalScore} XP очков опыта своей ежедневной цели
					</h2>

					{/* Статистика бонусов */}
					<div className="finish-screen__stats">
						<div className="finish-screen__stat-item">
							<span className="finish-screen__stat-label">Lesson Complete!</span>
							<span className="finish-screen__stat-value">+5 XP</span>
						</div>
						<div className="finish-screen__stat-item">
							<span className="finish-screen__stat-label">Combo Bonus!</span>
							<span className="finish-screen__stat-value">+2 XP</span>
						</div>
					</div>

					{/* Кнопки действий */}
					<div className="finish-screen__actions">
						<EngineButton variant="secondary" className="finish-screen__btn">
							<svg
								className="finish-screen__btn-icon"
								width="33"
								height="33"
								viewBox="0 0 33 33"
								fill="none">
								<path d="M16.4892 29.9037..." fill="currentColor" />
								{/* ... остальные пути ... */}
							</svg>
							Пройти заново
						</EngineButton>
						<EngineButton variant="primary" className="finish-screen__btn">
							<svg
								className="finish-screen__btn-icon"
								width="16"
								height="14"
								viewBox="0 0 16 14"
								fill="none">
								<path d="M15.7443 7.65384..." fill="currentColor" />
							</svg>
							Продолжить
						</EngineButton>
					</div>

					{/* Блок обратной связи */}
					<div className="finish-screen__feedback">
						<h3 className="finish-screen__feedback-title">Оцените наш модуль</h3>
						<p className="finish-screen__feedback-subtitle">Ваше мнение важно!</p>
						<div className="finish-screen__rating">
							<button className="finish-screen__rating-btn">
								<img src="/positive.png" alt="Positive" />
							</button>
							<button className="finish-screen__rating-btn">
								<img src="/negative.png" alt="Negative" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
