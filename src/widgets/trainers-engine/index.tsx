'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames'
import { m, AnimatePresence } from 'motion/react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { type RootState } from '@/app/_store'
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { ErrorFooter } from '@/components/Engine/Footer/error'
import { SuccessFooter } from '@/components/Engine/Footer/success'
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
	changeMode,
	nextLesson
} from '@/entities/engine/model/engine.slice'
import { resetScore, addPoints, subtractPoints } from '@/entities/engine/model/scoring.slice'
import { initTimer } from '@/entities/engine/model/timer.slice'
import './styles.scss'
import { useGetLessonTasks, useGetLessonUniqueTask } from '@/hooks/queries/education/useGetTasks'
import { Button } from '@/shared/ui/Button'

import { EngineFooter } from './engine-footer'
import { EngineHeader } from './engine-header'
import { EngineTheory } from './engine-theory'
import RenderTrainer from './render-trainer'

import type { Id, TrainerTheme } from '@/shared/types/types'
import { LearningSidebar } from '@/components/LearningSidebar'
import { LessonsSidebar } from '@/components/LessonsSidebar'


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

export interface TrainerRef {
	handleCheck: () => void
	handleReset: () => void
}
interface TrainersEngineProps {
	config: {
		themeName: TrainerTheme
		time: number
	}
	data:{
        id: Id;
        name: string;
        description: string;
        sort_order: number;
        total_tasks: number;
    }[]
	engineStatus: 'engineLoading' | 'engineSuccess' | 'engineError'
}
export const TrainersEngine = ({ data, config, engineStatus }: TrainersEngineProps) => {
	const { themeName, time } = config

	const dispatch = useAppDispatch()
	const { status, currentTrainerIndex, isMenuOpen, isHelpOpen, isSupportModalOpen,mode,currentLessonIndex } = useAppSelector(
		(state: RootState) => state.engine,
	)
	const currentLessonData = data ? data[currentLessonIndex] : null
	const {
		moduleId,
		pieceId,
	} = useParams<{moduleId: string; pieceId: string;}>()

const {
    data: taskData,
    isLoading
} = useGetLessonTasks(
    Number(moduleId),
    Number(pieceId),
    currentLessonData?.id || 0,
    Boolean(currentLessonData?.id && currentLessonData.total_tasks > 0 && mode === "practice")
);

const activeIndex = currentTrainerIndex;


const currentTaskData = taskData && taskData.data && taskData.data.length > 0
    ? taskData.data[activeIndex]
    : undefined;

const {
    data: uniqueTask,
    isLoading: isUniqueTaskLoading,
    isError: isUniqueTaskError
} = useGetLessonUniqueTask(
    Number(moduleId),
    Number(pieceId),
    currentLessonData?.id || 0,
    currentTaskData?.id,
    Boolean(mode === "practice" && currentTaskData?.id)
);

	const startPractice = () => {
		dispatch(changeMode("practice"))
	}
	const { isFinished } = useAppSelector((state: RootState) => state.timer)

	// const { totalScore } = useAppSelector(state => state.scoreReducer);
	const timerRef = useRef<TimerRef>(null)
	const trainerRef = useRef<TrainerRef>(null)
	const onMainButtonClick = () => {
		if(currentLessonIndex===data.length-1){
			dispatch(setStatus("finish"))
			// console.log('tut problema')
		}else if(currentLessonIndex!==data.length-1&&mode==="practice"&&activeIndex===undefined) {
				dispatch(changeMode("theory"))
			}
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
    if (status !== 'success' || !data || !taskData) return;

    const activeIndex = currentTrainerIndex !== null && currentTrainerIndex !== undefined
        ? currentTrainerIndex
        : 0;

    const isLastTrainer = activeIndex === taskData.data.length - 1;
    const hasNextLesson = currentLessonIndex < data.length - 1;

    if (isLastTrainer) {
        if (hasNextLesson) {
            dispatch(resetTrainers());
            dispatch(changeMode("theory"));
            dispatch(nextLesson({ totalLessons: data.length }));
        } else {
            // console.log('Курс полностью завершен');
			dispatch(setStatus("finish"))
        }
    } else {
        dispatch(nextTrainer({ totalTrainers: taskData.data.length }));
    }
};
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
		if (!currentTaskData) return
		dispatch(addPoints(uniqueTask?.task.xp_reward||0))
	}
	const handleError = () => {
		if (!currentTaskData) return
		dispatch(subtractPoints(0))
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
	if(status==="finish") {return <div className={cn('trainers-engine', themeName)}>
		<div className="trainers-engine__finish-screen">
						<EngineFinishScreen />
					</div>
	</div>}
	if(mode==="theory"&&currentLessonData) {
		return (
				<div className={cn('trainers-engine', themeName)}>
					<div className="trainers-engine__container trainers-engine__container_theory">
						<main className="trainers-engine__main trainers-engine__main--theory">
					<LessonsSidebar handleLessonClick={()=>console.log('testclick')} lessons={data} currentLessonId={currentLessonIndex}/>

						<EngineTheory handleClickTasksBtn={() => startPractice()} hasTasks={currentLessonData.total_tasks > 0} description={currentLessonData.description} title={currentLessonData.name} handleNextBtn={() => dispatch(nextLesson({ totalLessons: data.length }))}/>
						</main>
					</div>
					</div>
		)
	}

	if (data && currentLessonData && currentLessonData.total_tasks > 0 && mode === "practice") {

    if (isLoading) {
        return "Loading tasks list...";
    }
    if (isUniqueTaskLoading) {
        return "isUniqueTaskLoading";
    }
    if (!uniqueTask && (isUniqueTaskLoading || currentTaskData?.id)) {
        return "Loading specific task...";
    }

    if (isUniqueTaskError) {
        return "isUniqueTaskeRROR";
    }

    if (!uniqueTask) {
        return "Task noFound";
    }
		return (
			<div className={cn('trainers-engine', themeName)}>
					<div className="trainers-engine__container">
						<EngineHeader
							handleMenuClick={handleMenuClick}
							menuIsOpen={isMenuOpen}
							handleHelpMenuOpen={handleHelpMenuClick}
							currentTrainerIndex={currentTrainerIndex||0}
							totalTrainersCount={currentLessonData.total_tasks}
						/>

						<main className="trainers-engine__main">
							<div className="trainers-engine__side-controls">
								<HelpTrigger handleClick={handleSupportModalClick} />
								<Hint
									handleClick={() => 'clicked'}
									hintText={""}
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
											type={uniqueTask?.task.task_type.slug}
											data={{
												payload:uniqueTask.task.config,
												title:uniqueTask.task.title,
												subTitle:uniqueTask.task.description
											}}
											changeStatus={changeStatus}
											onError={handleError}
											onSuccess={handleSuccess}
											currentIndex={(currentTrainerIndex===null?0:currentTrainerIndex) + 1}
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

				<Menu isOpen={isMenuOpen} onClose={() => dispatch(setIsMenuOpen(false))} />
				{isHelpOpen && <AlertModal isOpen={isHelpOpen} onClose={handleHelpMenuClick} />}
				{isSupportModalOpen && (
					<SupportModal isOpen={isSupportModalOpen} onClose={handleSupportModalClick} />
				)}
			</div>
		)
	}
}
