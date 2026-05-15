'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { type RootState } from '@/app/_store'
import dynamic from 'next/dynamic'
import { EngineHeader } from './engine-header'
import { useEffect, useRef } from 'react'
import { EngineFooter } from './engine-footer'
import { SuccessFooter } from '@/components/Engine/Footer/success'
import { ErrorFooter } from '@/components/Engine/Footer/error'
import { HelpTrigger } from '@/components/Engine/HelpTrigger'
import { Hint } from '@/components/Engine/Hint'
import { type TimerRef } from '@/components/Engine/Timer'
import {
	resetTrainers,
	nextTrainer,
	setStatus,
	setIsMenuOpen,
	setHelpModalOpen,
	setSupportModalOpen,
	setTheme,
} from '@/entities/engine/model/engine.slice'
import { resetScore, addPoints, subtractPoints } from '@/entities/engine/model/scoring.slice'
import { initTimer } from '@/entities/engine/model/timer.slice'
import RenderTrainer from './render-trainer'
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { m, AnimatePresence } from 'motion/react'

import cn from 'classnames'

import './styles.scss'
import { type TrainerTheme } from '@/shared/types/types'
import { type TrainerType } from './trainersMap'

const Menu = dynamic(() => import('@/components/Engine/Menu').then(mod => mod.Menu), {
	ssr: false,
})
const AlertModal = dynamic(() => import('@/components/Engine/AlertModal').then(mod => mod.AlertModal), { ssr: false })
const SupportModal = dynamic(() => import('@/components/Engine/SupportModal').then(mod => mod.SupportModal), {
	ssr: false,
})
const EngineFinishScreen = dynamic(
	() => import('@/components/Engine/FinishScreen').then(mod => mod.EngineFinishScreen),
	{ ssr: false },
)
// bg-[url('/Frame.jpg')]
export interface TrainerRef {
	handleCheck: () => void
	handleReset: () => void
}
interface TrainersEngineProps {
	config: {
		themeName: TrainerTheme
		time: number
	}
	data:
		| {
				type: TrainerType
				payload: unknown
				title?: string
				subTitle?: string
				scoring: {
					points: number
					penaltyPerMistake: number
				}
		  }[]
		| null
	engineStatus: 'engineLoading' | 'engineSuccess' | 'engineError'
}
export const TrainersEngine = ({ data, config, engineStatus }: TrainersEngineProps) => {
	const { themeName, time } = config

	const dispatch = useAppDispatch()
	const { status, currentTrainerIndex, isMenuOpen, isHelpOpen, isSupportModalOpen } = useAppSelector(
		(state: RootState) => state.engine,
	)
	const { isFinished } = useAppSelector((state: RootState) => state.timer)
	// const { totalScore } = useAppSelector(state => state.scoreReducer);
	const currentTrainerData = data ? data[currentTrainerIndex] : null
	const timerRef = useRef<TimerRef>(null)
	const trainerRef = useRef<TrainerRef>(null)
	const onMainButtonClick = () => {
		trainerRef.current?.handleCheck()
	}
	const onResetButtonClick = () => {
		trainerRef.current?.handleReset()
		if (isFinished && status === 'error') {
			dispatch(resetTrainers())
			dispatch(initTimer(time))
			dispatch(resetScore())
		}
	}

	useEffect(() => {
		dispatch(initTimer(time))
		dispatch(setTheme(themeName))
	}, [])
	const handleNext = () => {
		if (status !== 'success' || !data) return
		dispatch(nextTrainer({ totalTrainers: data.length }))
	}
	const handleTimerEnd = () => {
		dispatch(setStatus('error'))
	}
	const changeStatus = (value: 'idle' | 'error' | 'success') => {
		dispatch(setStatus(value))
	}
	const handleMenuClick = () => {
		dispatch(setIsMenuOpen(!isMenuOpen))
	}
	const handleHelpMenuClick = () => {
		dispatch(setHelpModalOpen(!isHelpOpen))
	}
	const handleSupportModalClick = () => {
		dispatch(setSupportModalOpen(!isSupportModalOpen))
	}
	const handleSuccess = () => {
		if (!currentTrainerData) return
		dispatch(addPoints(currentTrainerData.scoring.points))
	}
	const handleError = () => {
		if (!currentTrainerData) return
		dispatch(subtractPoints(currentTrainerData.scoring.penaltyPerMistake))
	}
	useEffect(() => {
		let timeoutId: NodeJS.Timeout
		if (status === 'success') {
			timeoutId = setTimeout(() => {
				handleNext()
			}, 1000)
		}
		return () => clearTimeout(timeoutId)
	}, [status, currentTrainerIndex])

	if (engineStatus === 'engineLoading') return <div>Loading...</div>
	if (engineStatus === 'engineError') return <div>Something went wrong</div>
	if (engineStatus === 'engineSuccess' && data && currentTrainerData) {
		return (
			<div className={cn('trainers-engine', themeName)}>
				{status !== 'finish' && (
					<div className="trainers-engine__container">
						<EngineHeader
							handleMenuClick={handleMenuClick}
							menuIsOpen={isMenuOpen}
							handleHelpMenuOpen={handleHelpMenuClick}
							currentTrainerIndex={currentTrainerIndex}
							totalTrainersCount={data.length}
						/>

						<main className="trainers-engine__main">
							<div className="trainers-engine__side-controls">
								<HelpTrigger handleClick={handleSupportModalClick} />
								<Hint
									handleClick={() => 'clicked'}
									hintText={'Test text loremaqe west? Hellot Ye;yj'}
								/>
							</div>
							<div className="trainers-engine__content">
								<AnimatePresence mode="wait">
									<m.div
										key={currentTrainerIndex}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}>
										<RenderTrainer
											ref={trainerRef}
											type={currentTrainerData.type}
											data={currentTrainerData}
											changeStatus={changeStatus}
											onError={handleError}
											onSuccess={handleSuccess}
											currentIndex={currentTrainerIndex + 1}
										/>
									</m.div>
								</AnimatePresence>
							</div>
						</main>

						<footer className="trainers-engine__footer">
							{status === 'idle' && (
								<EngineFooter
									onClickBtn={onMainButtonClick}
									onTimerEnd={handleTimerEnd}
									timerRef={timerRef}
								/>
							)}
							{status === 'success' && <SuccessFooter />}
							{status === 'error' && <ErrorFooter handleReset={onResetButtonClick} />}
						</footer>
					</div>
				)}

				{status === 'finish' && (
					<div className="trainers-engine__finish-screen">
						<EngineFinishScreen />
					</div>
				)}

				<Menu isOpen={isMenuOpen} onClose={() => dispatch(setIsMenuOpen(false))} />
				{isHelpOpen && <AlertModal isOpen={isHelpOpen} onClose={handleHelpMenuClick} />}
				{isSupportModalOpen && (
					<SupportModal isOpen={isSupportModalOpen} onClose={handleSupportModalClick} />
				)}
			</div>
		)
	}
}
