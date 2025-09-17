'use client'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { ProgressBar } from '@/shared/ui/ProgressBar'

import { changeCurrentTask } from '../LearningAttestation/attestation.slice'

import { StepCounter } from './StepCounter'

import './styles.scss'

export const AttestationPaginator = () => {
	const { data, currentTaskNumber } = useAppSelector(state => state.learningAttestationReducer)

	const dispatch = useAppDispatch()
	const handleClickD = (id: number) => {
		dispatch(changeCurrentTask(id))
	}
	let numberOfCompletedTasks = 0
	data.forEach(item => {
		if (item.completed) {
			numberOfCompletedTasks += 1
		}
	})
	return (
		<div className="AttestationPaginator">
			<div className="AttestationPaginator__wrapper">
				<h5 className="AttestationPaginator__title">Аттестация</h5>
				<ul className="AttestationPaginator__list">
					{data.map(item => (
						<StepCounter
							key={item.id}
							active={item.id === currentTaskNumber}
							completed={item.completed}
							content={item.id}
							id={item.id}
							handleClick={() => handleClickD(item.id)}
						/>
					))}
				</ul>
				<ProgressBar
					className="AttestationPaginator__progressBar"
					doneLessons={0}
					maxLessons={data.length}
					processLessons={numberOfCompletedTasks}
				/>
			</div>
		</div>
	)
}
