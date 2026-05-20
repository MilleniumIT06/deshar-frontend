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
						<Image
							width={141}
							height={141}
							src="/images/Engine/box.png"
							alt="Finish box"
							quality={100}
						/>
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
						<EngineButton variant="secondary" className="finish-screen__btn finish-screen__btn-retry">
							<svg
								className="finish-screen__btn-icon"
								width="33"
								height="33"
								viewBox="0 0 33 33"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M16.4892 29.9037C14.2107 29.9037 11.9264 29.2571 9.94437 27.9459C5.59972 25.0728 3.62126 19.5814 5.13308 14.5912C5.29808 14.0462 5.87403 13.7379 6.41905 13.9034C6.96406 14.0684 7.27189 14.6443 7.10689 15.1893C5.85753 19.3133 7.49258 23.8513 11.0818 26.2253C14.7082 28.6234 19.5556 28.33 22.8716 25.5122C26.1453 22.7298 27.224 17.8711 25.4363 13.9596C23.5486 9.82839 18.9523 7.49982 14.5087 8.42279C12.6385 8.81106 10.8689 9.77167 9.5262 11.1288C9.12556 11.5336 8.47278 11.5372 8.06801 11.1365C7.66325 10.7359 7.65964 10.0831 8.06028 9.67834C9.68553 8.03607 11.8269 6.87334 14.0895 6.40361C19.4685 5.28934 25.0285 8.10414 27.3127 13.1026C29.5108 17.9124 28.2341 23.6621 24.2081 27.0843C22.0085 28.9524 19.2524 29.9037 16.4892 29.9037Z"
									fill="#2E2E2E"
								/>
								<path
									d="M8.79385 11.435C8.70568 11.435 8.61544 11.4236 8.52624 11.3994C7.97607 11.2519 7.64968 10.6868 7.79714 10.1366L9.47602 3.86972C9.62349 3.31955 10.1886 2.99109 10.7388 3.14062C11.289 3.28809 11.6153 3.85322 11.4679 4.40339L9.789 10.6703C9.66577 11.1307 9.24914 11.435 8.79385 11.435Z"
									fill="#2E2E2E"
								/>
								<path
									d="M15.0608 13.115C14.9721 13.115 14.8823 13.1037 14.7931 13.0794L8.52624 11.3995C7.97607 11.2521 7.64968 10.6869 7.79714 10.1368C7.94461 9.58659 8.51283 9.25969 9.05991 9.40767L15.3268 11.0876C15.877 11.235 16.2034 11.8002 16.0559 12.3503C15.9327 12.8108 15.5161 13.115 15.0608 13.115Z"
									fill="#2E2E2E"
								/>
							</svg>
							Пройти заново
						</EngineButton>
						<EngineButton
							variant="primary"
							className="finish-screen__btn finish-screen__btn-continue">
							Продолжить
							<svg
								width="16"
								height="14"
								viewBox="0 0 16 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M15.7443 7.65384L9.9661 13.7313C9.80115 13.9048 9.58132 14 9.34692 14C9.11225 14 8.89254 13.9046 8.7276 13.7313L8.20299 13.1794C8.03818 13.0062 7.94738 12.7748 7.94738 12.5281C7.94738 12.2816 8.03818 12.0425 8.20299 11.8692L11.5739 8.31602L0.864384 8.31602C0.381526 8.31602 1.06333e-06 7.91844 1.15215e-06 7.41044L1.28858e-06 6.63019C1.3774e-06 6.1222 0.381527 5.68452 0.864385 5.68452L11.6121 5.68453L8.20312 2.11147C8.03831 1.93798 7.94751 1.71292 7.94751 1.46625C7.94751 1.21984 8.03831 0.991499 8.20312 0.818155L8.72774 0.268022C8.89268 0.0945412 9.11238 1.59326e-06 9.34705 1.63429e-06C9.58145 1.67527e-06 9.80129 0.0957716 9.96623 0.269253L15.7444 6.34658C15.9097 6.5206 16.0006 6.75291 16 6.99987C16.0005 7.24764 15.9097 7.48009 15.7443 7.65384Z"
									fill="white"
								/>
							</svg>
						</EngineButton>
					</div>

					{/* Блок обратной связи */}
					<div className="finish-screen__feedback">
						<h3 className="finish-screen__feedback-title">Оцените наш модуль</h3>
						<p className="finish-screen__feedback-subtitle">Ваше мнение важно!</p>
						<div className="finish-screen__rating">
							<button className="finish-screen__rating-btn">
								<img src="/images/Engine/positive.png" alt="Positive" />
							</button>
							<button className="finish-screen__rating-btn">
								<img src="/images/Engine/negative.png" alt="Negative" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
