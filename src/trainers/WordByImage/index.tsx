'use client'
import { DndContext } from '@dnd-kit/core'
import { useImperativeHandle, forwardRef } from 'react'
import { MoveBoxImage } from './MoveBox'
import { DropInput } from './DropInput'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { useWordTrainer } from '@/hooks/trainers/useWordTrainer'

import './styles.scss'
import Image from 'next/image'
import { type TrainerCommonProps } from '@/shared/types/types'
import { type TrainerRef } from '@/widgets/trainers-engine'

export interface IWordLetter {
	id: number | string
	letter: string
}
export interface IWordSlot {
	id: number | string
	current: string | null
}

interface WordByImageProps extends TrainerCommonProps {
	status: 'idle' | 'error' | 'success'
	payload: {
		id: number | string
		correctAnswer: string
		availableLetters: IWordLetter[]
		imageUrl: string
	}
}

export const WordByImage = forwardRef<TrainerRef, WordByImageProps>(
	({ title, subTitle, status, changeStatus, onSuccess, onError, payload, currentTrainerIndex }, ref) => {
		const { correctAnswer, availableLetters, imageUrl, id } = payload

		const {
			slots,
			letters,
			sensors,
			handleDragEnd,
			handleCheck: coreCheck,
			handleReset,
			disableMoveBox,
		} = useWordTrainer({
			id,
			correctAnswer,
			availableLetters,
			changeStatus,
		})

		const wrappedHandleCheck = () => {
			const isAnySlotFilled = slots.some(slot => slot.current !== null)
			if (!isAnySlotFilled) return

			coreCheck()

			const userAnswer = slots.map(slot => slot.current).join('')
			if (userAnswer === correctAnswer) {
				onSuccess?.()
			} else {
				onError?.()
			}
		}

		useImperativeHandle(ref, () => ({
			handleCheck: wrappedHandleCheck,
			handleReset,
		}))
		return (
			<div className="word-image-trainer">
				<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
					<div className="word-image-trainer__content">
						<div className="word-image-trainer__header">
							<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
							<TrainerTitle title={title} />
							{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
						</div>

						<div className="word-image-trainer__image-wrapper">
							<Image src={imageUrl} alt={title} className="word-image-trainer__image" fill />
						</div>

						<div className="word-image-trainer__slots-container">
							{slots.map(slot => (
								<DropInput key={slot.id} {...slot} error={status === 'error'} />
							))}
						</div>

						<ul className="word-image-trainer__letters-pool">
							{letters.map(letter => (
								<MoveBoxImage
									key={letter.id}
									char={letter.letter}
									id={letter.id}
									isDisabled={disableMoveBox(letter)}
								/>
							))}
						</ul>
					</div>
				</DndContext>
			</div>
		)
	},
)

WordByImage.displayName = 'WordByImage'
