'use client'
import { useState } from 'react'

import { type DragEndEvent, DndContext } from '@dnd-kit/core'
import cn from 'classnames'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { changeCompletedStatus, changeCurrentTask } from '@/components/LearningAttestation/attestation.slice'
import { type IMissingWordDndTask } from '@/components/LearningContent'
import { MoveBox } from '@/components/MoveBox'
import { TrainerWrapper } from '@/components/TrainerWrapper'
import { useDragDropWord } from '@/shared/hooks/useDragDropWord'

import styles from './styles.module.scss'

export interface ISlot {
	id: string | number
	correct: string
	current: null | string
}
export const DragDropTrainer = ({ data }: { data: IMissingWordDndTask }) => {
	const [letters] = useState(data.letters)
	const [slots, setSlots] = useState(data.slots)
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (over) {
			setSlots(
				slots.map(slot => (slot.id === over.id ? { ...slot, current: active.data.current?.char } : slot)),
			)
		}
	}
	const { currentTaskNumber } = useAppSelector(state => state.learningAttestationReducer)
	const dispatch = useAppDispatch()
	const handleSuccess = () => {
		dispatch(changeCurrentTask(currentTaskNumber + 1))
		dispatch(changeCompletedStatus({ id: currentTaskNumber, value: true }))
	}
	const { handleCheckAnswers, completed, hasError, isButtonDisabled, renderSentence } = useDragDropWord({
		data: { id: data.id, missingWords: data.missingWords, sentence: data.sentence, type: data.type },
		slots: slots,
		onSuccess: handleSuccess,
		// eslint-disable-next-line no-console
		onError: () => console.log('error'),
	})
	const disableMoveBox = (value: string) => {
		if (slots.find(item => item.current === value)) {
			return true
		}
		return false
	}
	return (
		<TrainerWrapper
			handleCheckAnswers={handleCheckAnswers}
			hasError={hasError}
			isButtonDisabled={isButtonDisabled}
			completed={completed}
			title="Перетащите пропущенные буквы в предложении из вариантов ниже">
			<div className={styles.index}>
				<DndContext onDragEnd={handleDragEnd}>
					<div className={styles.index__inner}>
						<div className={styles.index__content}>{renderSentence()}</div>

						<div className={styles.index__variants}>
							<ul className={cn('list-reset', styles.index__list)}>
								{letters.map(value => (
									<MoveBox
										key={`key-${value.id}+${value.char}`}
										char={value.char}
										id={value.id}
										isDisabled={disableMoveBox(value.char)}
									/>
								))}
							</ul>
						</div>
					</div>
				</DndContext>
			</div>
		</TrainerWrapper>
	)
}
