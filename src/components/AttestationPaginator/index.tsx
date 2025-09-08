'use client'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'

import { changeCurrentTask } from '../LearningAttestation/attestation.slice'

import { StepCounter } from './StepCounter'
import './styles.scss'

export const AttestationPaginator = () => {
	const { data, currentTaskNumber } = useAppSelector(state => state.learningAttestationReducer)

	const dispatch = useAppDispatch()
	const handleClickD = (id: number) => {
		dispatch(changeCurrentTask(id))
	}
	return (
		<div className="AttestationPaginator">
			<div className="AttestationPaginator__wrapper">
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
			</div>
		</div>
	)
}
