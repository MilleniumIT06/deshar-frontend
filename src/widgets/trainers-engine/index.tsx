'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { type RootState } from '@/app/_store'
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { type TimerRef } from '@/components/Engine/Timer'
import { useCountdownTimer } from '@/components/LearningContent/useCountdownTimer'
import {
	resetTrainers,
	setStatus,
	setIsMenuOpen,
	setHelpModalOpen,
	setSupportModalOpen,
	setTheme,
	changeMode,
} from '@/entities/engine/model/engine.slice'
import { resetScore, addPoints, subtractPoints } from '@/entities/engine/model/scoring.slice'
import { initTimer } from '@/entities/engine/model/timer.slice'

import './styles/styles.scss'

import { AUTO_ADVANCE_DELAY_MS, PRACTICE_UNLOCK_DELAY_SECONDS } from './constants'
import { EngineFinishScreen } from './dynamic-imports'
import { useEngineNavigation } from './hooks/useEngineNavigation'
import { useLessonPracticeData } from './hooks/useLessonPracticeData'
import { PracticeScreen } from './views/practice.view'
import { TheoryScreen } from './views/theory.view'

import type { TrainerRef, TrainersEngineProps } from './types/types'


export const TrainersEngine = ({ data: lessons, config, engineStatus }: TrainersEngineProps) => {
	const { themeName, time } = config
	const dispatch = useAppDispatch()

	const { status, currentTrainerIndex, isMenuOpen, isHelpOpen, isSupportModalOpen, mode, currentLessonIndex } =
		useAppSelector((state: RootState) => state.engine)
	const { isFinished } = useAppSelector((state: RootState) => state.timer)

	const { moduleId, pieceId } = useParams<{ moduleId: string; pieceId: string }>()
	const currentLesson = lessons ? lessons[currentLessonIndex] : null

	const trainerRef = useRef<TrainerRef>(null)
	const timerRef = useRef<TimerRef>(null)

	const {
		isExpired: isCountdownExpired,
		secondsLeft,
		restart: restartCountdown,
	} = useCountdownTimer(PRACTICE_UNLOCK_DELAY_SECONDS)

	const { taskData, isTaskListLoading, activeTask, uniqueTask, isTaskDetailLoading, isTaskDetailError } =
		useLessonPracticeData({
			moduleId: Number(moduleId),
			pieceId: Number(pieceId),
			currentLesson,
			mode,
			activeTaskIndex: currentTrainerIndex,
		})

	const { handleNext, handleTheoryNext, startPractice, isLastLesson } = useEngineNavigation({
		lessons,
		currentLessonIndex,
		currentTrainerIndex,
		time,
		restartPracticeCountdown: restartCountdown,
	})

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
		const isFinalLesson = currentLessonIndex === lessons.length - 1
		const hasNoActiveTrainer = mode === 'practice' && currentTrainerIndex === undefined

		if (isFinalLesson) {
			dispatch(setStatus('finish'))
		} else if (hasNoActiveTrainer) {
			dispatch(changeMode('theory'))
		}
		trainerRef.current?.handleCheck()
	}

	const onResetButtonClick = () => {
		trainerRef.current?.handleReset()
		if (isFinished && status === 'error') {
			dispatch(resetTrainers())
			dispatch(resetScore())
		}
	}

	const changeStatus = (value: 'idle' | 'error' | 'success') => dispatch(setStatus(value))
	const handleMenuToggle = () => dispatch(setIsMenuOpen(!isMenuOpen))
	const handleMenuClose = () => dispatch(setIsMenuOpen(false))
	const handleHelpMenuClick = () => dispatch(setHelpModalOpen(!isHelpOpen))
	const handleSupportModalClick = () => dispatch(setSupportModalOpen(!isSupportModalOpen))
	const handleTimerEnd = () => dispatch(setStatus('error'))

	const handleSuccess = () => {
		if (!activeTask) return
		dispatch(addPoints(uniqueTask?.task.xp_reward || 0))
	}
	const handleError = () => {
		if (!activeTask) return
		dispatch(subtractPoints(0))
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
			<TheoryScreen
				themeName={themeName}
				lesson={currentLesson}
				lessonIndex={currentLessonIndex || 0}
				totalLessons={lessons.length}
				isMenuOpen={isMenuOpen}
				onMenuClick={handleMenuToggle}
				onHelpClick={handleHelpMenuClick}
				hasTasks={currentLesson.total_tasks > 0}
				isLastLesson={isLastLesson}
				isCountdownExpired={isCountdownExpired}
				secondsLeft={secondsLeft}
				onStartPractice={startPractice}
				onTheoryNext={handleTheoryNext}
			/>
		)
	}

	const isPracticeMode = currentLesson && currentLesson.total_tasks > 0 && mode === 'practice'
	if (isPracticeMode) {
		if (isTaskListLoading) return <div>Загрузка заданий...</div>
		if (isTaskDetailLoading) return <div>Загрузка задания...</div>
		if (isTaskDetailError) return <div>Не удалось загрузить задание</div>
		if (!uniqueTask) return <div>Задание не найдено</div>

		return (
			<PracticeScreen
				themeName={themeName}
				currentTrainerIndex={currentTrainerIndex}
				totalTasks={currentLesson.total_tasks}
				isMenuOpen={isMenuOpen}
				onMenuClick={handleMenuToggle}
				onMenuClose={handleMenuClose}
				onHelpClick={handleHelpMenuClick}
				onSupportClick={handleSupportModalClick}
				isHelpOpen={isHelpOpen}
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
		)
	}

	return null
}
