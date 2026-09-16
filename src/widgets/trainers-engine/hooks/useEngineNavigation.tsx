import { useAppDispatch } from '@/app/_store/hooks'
import { resetTrainers, nextTrainer, setStatus, changeMode, nextLesson } from '@/entities/engine/model/engine.slice'
import { addCurrentToTotalScore } from '@/entities/engine/model/scoring.slice'
import { initTimer, resumeTimer } from '@/entities/engine/model/timer.slice'

import type { LessonListItem } from '../types/types'

interface UseEngineNavigationParams {
	lessons: LessonListItem[]
	currentLessonIndex: number
	currentTrainerIndex: number | null
	time: number
	restartPracticeCountdown: () => void
}

export function useEngineNavigation({ lessons, currentLessonIndex, currentTrainerIndex, time, restartPracticeCountdown }: UseEngineNavigationParams) {
	const dispatch = useAppDispatch()

	const isLastLesson = currentLessonIndex === lessons.length - 1

	const goToNextLessonOrFinish = () => {
		if (currentLessonIndex < lessons.length - 1) {
			dispatch(resetTrainers())
			dispatch(changeMode('theory'))
			if (lessons[currentLessonIndex].total_tasks > 0) {
				dispatch(addCurrentToTotalScore())
			}
			dispatch(nextLesson({ totalLessons: lessons.length }))
		} else {
			dispatch(setStatus('finish'))
		}
	}

	// const handleNext = (taskData: { data: unknown[] } | undefined) => {
	// 	if (!taskData) return

	// 	const activeIndex = currentTrainerIndex ?? 0
	// 	const isLastTrainerInLesson = activeIndex === taskData.data.length - 1

	// 	if (!isLastTrainerInLesson) {
	// 		dispatch(nextTrainer({ totalTrainers: taskData.data.length }))
	// 		return
	// 	}

	// 	if (currentLessonIndex < lessons.length - 1) {
	// 		dispatch(resetTrainers())
	// 		dispatch(addCurrentToTotalScore())
	// 		dispatch(changeMode('theory'))
	// 		dispatch(nextLesson({ totalLessons: lessons.length }))
	// 		dispatch(initTimer(time))
	// 		restartPracticeCountdown()
	// 	} else {
	// 		dispatch(addCurrentToTotalScore())
	// 		dispatch(setStatus('finish'))
	// 	}
	// }
	// TODO: ЕСЛИ ЧТО ТО ПОЙДЕТ НЕ ТАК РАССКОМЕНТИРОВАТЬ ВЕРХНЮЮ И УБРАТЬ НИЖНЮЮ
	const handleNext = (taskData: { data: unknown[] } | undefined) => {
		if (!taskData) return
		const activeIndex = currentTrainerIndex ?? 0
		const isLastTrainerInLesson = activeIndex === taskData.data.length - 1
		if (!isLastTrainerInLesson) {
			dispatch(nextTrainer({ totalTrainers: taskData.data.length }))
			dispatch(resumeTimer())
			return
		}
		const currentLessonHasTasks = lessons[currentLessonIndex].total_tasks > 0

		if (currentLessonIndex < lessons.length - 1) {
			dispatch(resetTrainers())
			if (currentLessonHasTasks) {
				dispatch(addCurrentToTotalScore())
			}
			dispatch(changeMode('theory'))
			dispatch(nextLesson({ totalLessons: lessons.length }))
			dispatch(initTimer(time))
			restartPracticeCountdown()
		} else {
			if (currentLessonHasTasks) {
				dispatch(addCurrentToTotalScore())
			}
			dispatch(setStatus('finish'))
		}
	}
	const handleTheoryNext = () => {
		restartPracticeCountdown()
		goToNextLessonOrFinish()
	}

	const startPractice = () => {
		dispatch(changeMode('practice'))
		restartPracticeCountdown()
	}

	return { handleNext, handleTheoryNext, startPractice, isLastLesson }
}
