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
import { EngineFinishScreen } from '@/components/Engine/FinishScreen'
import { AlertModal } from '@/components/Engine/AlertModal'
import { SupportModal } from '@/components/Engine/SupportModal'
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

import './styles.scss'
// import { DragWordToPocket } from '@/trainers/DragWordToPocket'
// import { DragWordToPocket } from '@/trainers/DragWordToPocket'

const Menu = dynamic(() => import('@/components/Engine/Menu').then(mod => mod.Menu), {
	ssr: false,
})
// bg-[url('/Frame.jpg')]
export interface TrainerRef {
	handleCheck: () => void
	handleReset: () => void
}
export const TrainersEngine = () => {
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
		<div className="trainers-engine">
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
							/>
							{/* <DragWordToPocket
								ref={trainerRef}
								title="test"
								subTitle='test2'
								changeStatus={changeStatus}
								onError={() => 'error'}
								onSuccess={handleSuccess}
								payload={{
									items: [
										{
											id: 101,
											imageUrl: '/images/Engine/pocketItem1.png',
											correctVariantId: 4,
										},
										{
											id: 102,
											imageUrl: '/images/Engine/pocketItem2.png', 
											correctVariantId: 1,
										},
										{
											id: 103,
											imageUrl: '/images/Engine/pocketItem3.png',
											correctVariantId: 2,
										},
									],
									variants: [
										{ id: 1, value: 'Кошка' },
										{ id: 2, value: 'Собака' },
										{ id: 3, value: 'Птица' },
										{ id: 4, value: 'Человек' },
									],
								}} /> */}
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
