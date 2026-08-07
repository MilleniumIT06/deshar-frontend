/* eslint-disable no-console */
'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { type RootState } from '@/app/_store'
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { type TimerRef } from '@/components/Engine/Timer'
import { useCountdownTimer } from '@/components/LearningContent/useCountdownTimer'
import {
	resetTrainers,
	setStatus,
	setIsMenuOpen,
	setSupportModalOpen,
	setTheme,
	setAlertModalOpen,
	resetState,
} from '@/entities/engine/model/engine.slice'
import { addPoints, subtractPoints, resetCurrentScore } from '@/entities/engine/model/scoring.slice'
import { initTimer, resetTimer } from '@/entities/engine/model/timer.slice'
import { Loader } from '@/shared/ui/Loader'

import './styles/styles.scss'

import { AUTO_ADVANCE_DELAY_MS, ERROR_SUBSTRAC_POINTS, PRACTICE_UNLOCK_DELAY_SECONDS } from './constants'
import { AlertModal, EngineFinishScreen, Menu, SupportModal } from './dynamic-imports'
import { useEngineNavigation } from './hooks/useEngineNavigation'
import { useLessonPracticeData } from './hooks/useLessonPracticeData'
import { PracticeScreen } from './views/practice.view'
import { TheoryScreen } from './views/theory.view'

import type { TrainerRef, TrainersEngineProps } from './types/types'

export const TrainersEngine = ({ data: lessons, config, engineStatus }: TrainersEngineProps) => {
	const router = useRouter()
	const { themeName, time } = config
	const dispatch = useAppDispatch()
	console.log('dsa')
	const { status, currentTrainerIndex, isMenuOpen, isAlertModalOpen, isSupportModalOpen, mode, currentLessonIndex } = useAppSelector(
		(state: RootState) => state.engine,
	)
	const isFinished = useAppSelector((state: RootState) => state.timer.isFinished)

	const { moduleId, pieceId } = useParams<{ moduleId: string; pieceId: string }>()
	const currentLesson = lessons ? lessons[currentLessonIndex] : null
	console.log(lessons)
	const trainerRef = useRef<TrainerRef>(null)
	const timerRef = useRef<TimerRef>(null)

	const { isExpired: isCountdownExpired, secondsLeft, restart: restartCountdown } = useCountdownTimer(PRACTICE_UNLOCK_DELAY_SECONDS)

	const { taskData, isTaskListLoading, activeTask, uniqueTask, isTaskDetailLoading, isTaskDetailError } = useLessonPracticeData({
		moduleId: Number(moduleId),
		pieceId: Number(pieceId),
		currentLesson,
		mode,
		activeTaskIndex: currentTrainerIndex,
	})
	console.log('ddd', taskData)
	const { handleNext, handleTheoryNext, startPractice, isLastLesson } = useEngineNavigation({
		lessons,
		currentLessonIndex,
		currentTrainerIndex,
		time,
		restartPracticeCountdown: restartCountdown,
	})
	// const hasRestoredProgress = useRef(false)

	// useEffect(() => {
	// 	if (!lessons || lessons.length === 0) return
	// 	if (hasRestoredProgress.current) return

	// 	hasRestoredProgress.current = true

	// 	const targetLessonIndex = lessons.findIndex(lesson => lesson.progress.status !== 'completed')

	// 	if (targetLessonIndex === -1) {
	// 		dispatch(
	// 			restoreProgress({
	// 				lessonIndex: lessons.length - 1,
	// 				trainerIndex: 0,
	// 				mode: 'practice',
	// 			}),
	// 		)
	// 		return
	// 	}

	// 	const targetLesson = lessons[targetLessonIndex]

	// 	if (targetLesson.progress.status === 'in_progress') {
	// 		dispatch(
	// 			restoreProgress({
	// 				lessonIndex: targetLessonIndex,
	// 				trainerIndex: 0,
	// 				mode: 'practice',
	// 			}),
	// 		)
	// 	} else {
	// 		dispatch(
	// 			restoreProgress({
	// 				lessonIndex: targetLessonIndex,
	// 				trainerIndex: 0,
	// 				mode: 'theory',
	// 			}),
	// 		)
	// 	}
	// }, [lessons, dispatch])
	// const hasRestoredTrainerIndex = useRef(false)

	// useEffect(() => {
	// 	if (!hasRestoredProgress.current) return
	// 	if (hasRestoredTrainerIndex.current) return
	// 	if (mode !== 'practice') return
	// 	if (!taskData || taskData.data.length === 0) return

	// 	hasRestoredTrainerIndex.current = true

	// 	const firstIncompleteTaskIndex = taskData.data.findIndex(task => task.progress.status !== 'completed')

	// 	if (firstIncompleteTaskIndex > 0) {
	// 		dispatch(setTrainerIndex(firstIncompleteTaskIndex))
	// 	}

	// 	const restoredCurrentScore = taskData.data.reduce((sum, task) => {
	// 		return task.progress.status === 'completed' ? sum + task.xp_reward : sum
	// 	}, 0)

	// 	dispatch(setCurrentScore(restoredCurrentScore))
	// }, [taskData, mode, dispatch])

	useEffect(() => {
		dispatch(initTimer(time))
		dispatch(setTheme(themeName))
	}, [])

	useEffect(() => {
		if (status !== 'success') return
		const timeoutId = setTimeout(() => handleNext(taskData), AUTO_ADVANCE_DELAY_MS)
		return () => clearTimeout(timeoutId)
	}, [status, currentTrainerIndex])

	const onMainButtonClick = () => {
		if (currentLessonIndex === lessons.length - 1) {
			// dispatch(addCurrentToTotalScore())
			dispatch(setStatus('finish'))
		}
		trainerRef.current?.handleCheck(Number(moduleId), Number(pieceId), Number(currentLesson?.id), Number(uniqueTask?.task.id), 30)
	}

	const onResetButtonClick = () => {
		trainerRef.current?.handleReset()
		if (isFinished && status === 'error') {
			dispatch(resetTrainers())
			dispatch(resetCurrentScore())
			dispatch(setStatus('idle'))
			dispatch(resetTimer())
			dispatch(initTimer(time))
		}
	}
	const handleBreakLearningProcess = () => {
		trainerRef.current?.handleReset()
		dispatch(resetState())
		router.back()
	}

	const changeStatus = (value: 'idle' | 'error' | 'success' | 'checking') => dispatch(setStatus(value))
	const handleMenuToggle = () => dispatch(setIsMenuOpen(!isMenuOpen))
	const handleSupportModalClick = () => dispatch(setSupportModalOpen(!isSupportModalOpen))
	const handleTimerEnd = () => dispatch(setStatus('error'))
	const handleBreakBtnClick = () => dispatch(setAlertModalOpen(!isAlertModalOpen))
	// начисляем за каждую задачу
	// const handleSuccess = () => {
	// 	if (!activeTask) return
	// 	dispatch(addPoints(uniqueTask?.task.xp_reward || 0))
	// }
	// начисляем за урок если все задачи в уроке выполнены
	const handleSuccess = () => {
		if (!activeTask || !currentLesson) return

		const isLastTaskInLesson = currentTrainerIndex === currentLesson.total_tasks - 1

		if (isLastTaskInLesson) {
			dispatch(addPoints(currentLesson.xp_reward || 0))
		}
	}
	const handleError = () => {
		if (!activeTask) return
		dispatch(subtractPoints(ERROR_SUBSTRAC_POINTS))
	}

	if (engineStatus === 'engineLoading') return <div>Loading...</div>
	if (engineStatus === 'engineError') return <div>Something went wrong</div>

	if (status === 'finish') {
		return (
			<div className={cn('trainers-engine', themeName)}>
				<div className="trainers-engine__finish-screen">
					<EngineFinishScreen />
				</div>
			</div>
		)
	}

	if (mode === 'theory' && currentLesson) {
		return (
			<>
				<TheoryScreen
					themeName={themeName}
					lesson={currentLesson}
					lessonIndex={currentLessonIndex || 0}
					totalLessons={lessons.length}
					isMenuOpen={isMenuOpen}
					onMenuClick={handleMenuToggle}
					handelBreakBtnClick={handleBreakBtnClick}
					hasTasks={currentLesson.total_tasks > 0}
					isLastLesson={isLastLesson}
					isCountdownExpired={isCountdownExpired}
					secondsLeft={secondsLeft}
					onStartPractice={startPractice}
					onTheoryNext={handleTheoryNext}
				/>
				<Menu isOpen={isMenuOpen} onClose={() => 'test'} content="testth" />
				<AlertModal
					isOpen={isAlertModalOpen}
					onClose={handleBreakBtnClick}
					onCancelBtnClick={handleBreakBtnClick}
					onYesBtnClick={handleBreakLearningProcess}
				/>
			</>
		)
	}

	const isPracticeMode = currentLesson && currentLesson.total_tasks > 0 && mode === 'practice'
	if (isPracticeMode) {
		if (isTaskDetailLoading || isTaskListLoading)
			return (
				<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Loader />
				</div>
			)
		if (!uniqueTask || isTaskDetailError) return <div>Не удалось загрузить задание</div>
		console.log('debug-task:', uniqueTask)
		return (
			<>
				<PracticeScreen
					onBreakBtnClick={handleBreakBtnClick}
					themeName={themeName}
					currentTrainerIndex={currentTrainerIndex}
					totalTasks={currentLesson.total_tasks}
					isMenuOpen={isMenuOpen}
					onMenuClick={handleMenuToggle}
					onSupportClick={handleSupportModalClick}
					isSupportModalOpen={isSupportModalOpen}
					uniqueTask={uniqueTask}
					status={status}
					trainerRef={trainerRef}
					changeStatus={changeStatus}
					onError={handleError}
					onSuccess={handleSuccess}
					onMainButtonClick={onMainButtonClick}
					onResetButtonClick={onResetButtonClick}
					onTimerEnd={handleTimerEnd}
					timerRef={timerRef}
				/>
				<Menu isOpen={isMenuOpen} onClose={() => 'test'} content="testpr" />
				<AlertModal
					isOpen={isAlertModalOpen}
					onClose={handleBreakBtnClick}
					onCancelBtnClick={handleBreakBtnClick}
					onYesBtnClick={handleBreakLearningProcess}
				/>
				<SupportModal isOpen={isSupportModalOpen} onClose={handleSupportModalClick} />
			</>
		)
	}

	return null
}
