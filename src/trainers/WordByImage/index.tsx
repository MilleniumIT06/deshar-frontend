/* eslint-disable @next/next/no-img-element */
'use client'

import { DndContext } from '@dnd-kit/core'
import { useImperativeHandle, forwardRef } from 'react'
import './styles.scss'

import { API_URL } from '@/config/api.config'
import { useTrainerCheck } from '@/hooks/trainers/useTrainerCheck'
import { useWordTrainer } from '@/hooks/trainers/useWordTrainer'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { DropInput } from './DropInput'
import { MoveBoxImage } from './MoveBox'

import type { Id } from '@/shared/types/types'
import type { TrainerCommonProps, TrainerRef } from '@/widgets/trainers-engine/types/types'

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
	({ title, subTitle, status, changeStatus, onSuccess, onError, payload, currentTrainerIndex, audio, isAlreadyCompleted }, ref) => {
		const { correctAnswer, availableLetters, imageUrl, id } = payload

		const { slots, letters, sensors, handleDragEnd, handleReset, disableMoveBox } = useWordTrainer({
			id,
			correctAnswer,
			availableLetters,
			changeStatus,
		})

		const { runCheck, isCheckingRef } = useTrainerCheck({
			isCompleted: isAlreadyCompleted ?? false,
			onSuccess,
			onError,
			changeStatus,
		})

		const wrappedHandleCheck = async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
			const isAnySlotFilled = slots.some(slot => slot.current !== null)
			if (!isAnySlotFilled) return

			const userAnswer = slots.map(slot => slot.current || '').join('')
			const isCorrectClient = userAnswer === correctAnswer

			await runCheck(isCorrectClient, {
				moduleId,
				pieceId,
				lessonId,
				taskId,
				answer: userAnswer,
				timeSpent,
			})
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
							<TrainerTitle title={title} audio={audio} />
							{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
						</div>

						<div className="word-image-trainer__image-wrapper">
							<img src={API_URL.taskFiles() + imageUrl} alt={title} className="word-image-trainer__image" />
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
									isDisabled={disableMoveBox(letter) || isCheckingRef.current}
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
