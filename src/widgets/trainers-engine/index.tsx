/* eslint-disable react-hooks/exhaustive-deps */
'use client'
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
} from '@/entities/engine/model/engine.slice'
import { resetScore, addPoints } from '@/entities/engine/model/scoring.slice'
import { initTimer } from '@/entities/engine/model/timer.slice'
import RenderTrainer from './render-trainer'
import { testCardMock } from '@/mocks/data'
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'

import cn from 'classnames'

import './styles.scss'

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
export const TrainersEngine = ({ themeName }: { themeName: 'towers' | 'ocean' | 'forest' | 's' | 'default' }) => {
	const dispatch = useAppDispatch()
	const { status, currentTrainerIndex, isMenuOpen, isHelpOpen, isSupportModalOpen } = useAppSelector(
		(state: RootState) => state.engine,
	)
	const { isFinished } = useAppSelector((state: RootState) => state.timer)
	// const { totalScore } = useAppSelector(state => state.scoreReducer);
	const currentTrainerData = testCardMock[currentTrainerIndex]
	const timerRef = useRef<TimerRef>(null)
	const trainerRef = useRef<TrainerRef>(null)
	const onMainButtonClick = () => {
		trainerRef.current?.handleCheck()
	}
	const onResetButtonClick = () => {
		trainerRef.current?.handleReset()
		if (isFinished && status === 'error') {
			dispatch(resetTrainers())
			dispatch(initTimer(2 * 60))
			dispatch(resetScore())
		}
	}

	useEffect(() => {
		dispatch(initTimer(2 * 60))
	}, [])
	const handleNext = () => {
		dispatch(nextTrainer({ totalTrainers: testCardMock.length }))
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
		dispatch(addPoints(currentTrainerData.scoring.points))
	}
	return (
		<div className={cn('trainers-engine', themeName)}>
			{status !== 'finish' && (
				<div className="trainers-engine__container">
					<EngineHeader
						// className="trainers-engine__header"
						handleMenuClick={handleMenuClick}
						menuIsOpen={isMenuOpen}
						handleHelpMenuOpen={handleHelpMenuClick}
						currentTrainerIndex={currentTrainerIndex}
						totalTrainersCount={testCardMock.length}
					/>

					<main className="trainers-engine__main">
						<div className="trainers-engine__side-controls">
							<HelpTrigger handleClick={handleSupportModalClick} />
							<Hint handleClick={() => 'clicked'} hintText={'Test text'} />
						</div>
						<div className="trainers-engine__content">
							<RenderTrainer
								ref={trainerRef}
								type={currentTrainerData.type}
								data={currentTrainerData}
								changeStatus={changeStatus}
								onError={() => 'error'}
								onSuccess={handleSuccess}
								currentIndex={currentTrainerIndex + 1}
							/>
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
						{status === 'success' && <SuccessFooter onContinueBtnClick={handleNext} />}
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
			{isSupportModalOpen && <SupportModal isOpen={isSupportModalOpen} onClose={handleSupportModalClick} />}
		</div>
	)
}
