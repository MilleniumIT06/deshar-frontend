import cn from 'classnames'
import { m, AnimatePresence } from 'motion/react'

import { ErrorFooter } from '@/components/Engine/Footer/error'
import { SuccessFooter } from '@/components/Engine/Footer/success'
import { HelpTrigger } from '@/components/Engine/HelpTrigger'
import { Hint } from '@/components/Engine/Hint'


import { EngineFooter } from '../components/engine-footer'
import { EngineHeader } from '../components/engine-header'
import { AlertModal, Menu, SupportModal } from '../dynamic-imports'
import RenderTrainer from '../render-trainer'

import type { TrainerRef, UniqueTask } from '../types/types'
import type { TimerRef } from '@/components/Engine/Timer'
import type{ TrainerTheme } from '@/shared/types/types'



interface PracticeScreenProps {
	themeName: TrainerTheme
	currentTrainerIndex: number | null
	totalTasks: number
	isMenuOpen: boolean
	onMenuClick: () => void
	onMenuClose: () => void
	onHelpClick: () => void
	onSupportClick: () => void
	isHelpOpen: boolean
	isSupportModalOpen: boolean
	uniqueTask: UniqueTask
	status: 'idle' | 'success' | 'error'
	trainerRef: React.RefObject<TrainerRef|null>
	changeStatus: (value: 'idle' | 'error' | 'success') => void
	onError: () => void
	onSuccess: () => void
	onMainButtonClick: () => void
	onResetButtonClick: () => void
	onTimerEnd: () => void
	timerRef: React.RefObject<TimerRef|null>
}

export function PracticeScreen({
	themeName,
	currentTrainerIndex,
	totalTasks,
	isMenuOpen,
	onMenuClick,
	onMenuClose,
	onHelpClick,
	onSupportClick,
	isHelpOpen,
	isSupportModalOpen,
	uniqueTask,
	status,
	trainerRef,
	changeStatus,
	onError,
	onSuccess,
	onMainButtonClick,
	onResetButtonClick,
	onTimerEnd,
	timerRef,
}: PracticeScreenProps) {
	return (
		<div className={cn('trainers-engine', themeName)}>
			<div className="trainers-engine__container">
				<EngineHeader
					handleMenuClick={onMenuClick}
					menuIsOpen={isMenuOpen}
					handleHelpMenuOpen={onHelpClick}
					currentTrainerIndex={currentTrainerIndex || 0}
					totalTrainersCount={totalTasks}
				/>

				<main className="trainers-engine__main">
					<div className="trainers-engine__side-controls">
						<HelpTrigger handleClick={onSupportClick} />
						<Hint handleClick={() => 'clicked'} hintText={uniqueTask.task.hints[0]} />
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
									type={uniqueTask.task.task_type.slug}
									data={{
										payload: uniqueTask.task.config,
										title: uniqueTask.task.title,
										subTitle: uniqueTask.task.description,
									}}
									changeStatus={changeStatus}
									onError={onError}
									onSuccess={onSuccess}
									currentIndex={(currentTrainerIndex === null ? 0 : currentTrainerIndex) + 1}
								/>
							</m.div>
						</AnimatePresence>
					</div>
				</main>

				<footer className="trainers-engine__footer">
					{status === 'idle' && (
						<EngineFooter onClickBtn={onMainButtonClick} onTimerEnd={onTimerEnd} timerRef={timerRef} />
					)}
					{status === 'success' && <SuccessFooter />}
					{status === 'error' && <ErrorFooter handleReset={onResetButtonClick} />}
				</footer>
			</div>

			<Menu isOpen={isMenuOpen} onClose={onMenuClose} />
			{isHelpOpen && <AlertModal isOpen={isHelpOpen} onClose={onHelpClick} />}
			{isSupportModalOpen && <SupportModal isOpen={isSupportModalOpen} onClose={onSupportClick} />}
		</div>
	)
}
