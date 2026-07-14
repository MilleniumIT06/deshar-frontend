import cn from 'classnames'

import { EngineButton } from '@/components/Engine/Button'

import { EngineHeader } from '../components/engine-header'
import { EngineTheory } from '../components/engine-theory'
import { BackArrowIcon } from '../components/icons'


import type { LessonListItem } from '../types/types'
import type { TrainerTheme } from '@/shared/types/types'

interface TheoryScreenProps {
	themeName: TrainerTheme
	lesson: LessonListItem
	lessonIndex: number
	totalLessons: number
	isMenuOpen: boolean
	onMenuClick: () => void
	onHelpClick: () => void
	hasTasks: boolean
	isLastLesson: boolean
	isCountdownExpired: boolean
	secondsLeft: number
	onStartPractice: () => void
	onTheoryNext: () => void
}

export function TheoryScreen({
	themeName,
	lesson,
	lessonIndex,
	totalLessons,
	isMenuOpen,
	onMenuClick,
	onHelpClick,
	hasTasks,
	isLastLesson,
	isCountdownExpired,
	secondsLeft,
	onStartPractice,
	onTheoryNext,
}: TheoryScreenProps) {
	const countdownSuffix = isCountdownExpired ? '' : ` (${secondsLeft})`

	return (
		<div className={cn('trainers-engine', themeName)}>
			<div className="trainers-engine__container trainers-engine__container_theory">
				<EngineHeader
					handleMenuClick={onMenuClick}
					menuIsOpen={isMenuOpen}
					handleHelpMenuOpen={onHelpClick}
					currentTrainerIndex={lessonIndex}
					totalTrainersCount={totalLessons}
				/>

				<main className="trainers-engine__main trainers-engine__main--theory">
					<h6>Урок {lessonIndex + 1}</h6>
					<EngineTheory description={lesson.description} title={lesson.name} />
				</main>

				<footer>
					<div className={cn('engine-footer', themeName)}>
						<div className="engine-footer__container">
							<EngineButton variant="secondary" className="engine-footer__back-btn">
								<div className="engine-footer__back-content">
									<BackArrowIcon />
									<span className="engine-footer__back-text">НАЗАД</span>
								</div>
							</EngineButton>

							<div className="engine-footer__actions">
								{hasTasks ? (
									<EngineButton
										disabled={!isCountdownExpired}
										variant="primary"
										className="trainers-engine__button"
										onClick={onStartPractice}>
										Приступить к заданиям{countdownSuffix}
									</EngineButton>
								) : (
									<EngineButton
										variant="primary"
										className="trainers-engine__button"
										onClick={onTheoryNext}
										disabled={!isCountdownExpired}>
										{isLastLesson ? 'Завершить' : 'Перейти на след урок'}
										{countdownSuffix}
									</EngineButton>
								)}
							</div>
						</div>
					</div>
				</footer>
			</div>
		</div>
	)
}
