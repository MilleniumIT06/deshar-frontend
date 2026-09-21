'use client'

import { DndContext } from '@dnd-kit/core'
import Image from 'next/image'
import { useImperativeHandle, forwardRef } from 'react'
import './styles.scss'

import { useCheckAnswer } from '@/hooks/trainers/useCheckAnswer'
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
	({ title, subTitle, status, changeStatus, onSuccess, onError, payload, currentTrainerIndex, audio }, ref) => {
		const { correctAnswer, availableLetters, imageUrl, id } = payload

		const { checkAnswer, isLoading } = useCheckAnswer()

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

		const wrappedHandleCheck = async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
			if (isLoading) return

			const isAnySlotFilled = slots.some(slot => slot.current !== null)
			if (!isAnySlotFilled) return

			if (!moduleId || !pieceId || !lessonId || !taskId) return

			const userAnswer = slots.map(slot => slot.current || '').join('')

			coreCheck()

			const data = await checkAnswer({
				moduleId,
				pieceId,
				lessonId,
				taskId,
				answer: userAnswer, // Строка ответа
				timeSpent: timeSpent ?? 0,
			})

			if (!data) return

			// if (data.is_correct) {
			// 	changeStatus('success')
			// 	onSuccess?.()
			// } else {
			// 	changeStatus('error')
			// 	onError?.()
			// }
			const isCorrectClient = userAnswer === correctAnswer
			if (data?.is_correct || (data?.is_completed && isCorrectClient)) {
				console.log('vetka1')
				changeStatus('success')
				onSuccess()
			} else if (data?.attempts_left === 0) {
				console.log('vetka_no_attempts')
				changeStatus('attempts-left')
				// onNoAttemptsLeft()
			} else if (data?.is_correct === false) {
				console.log('vetka2')
				changeStatus('error')
				onError()
			} else {
				console.log('vetka3')
			}
			if (isCorrectClient !== data.is_correct) {
				// eslint-disable-next-line no-console
				console.warn('Client/server mismatch on answer check', {
					taskId,
					isCorrectClient,
					serverResult: data.is_correct,
				})
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
							<TrainerTitle title={title} audio={audio} />
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
								<MoveBoxImage key={letter.id} char={letter.letter} id={letter.id} isDisabled={disableMoveBox(letter)} />
							))}
						</ul>
					</div>
				</DndContext>
			</div>
		)
	},
)

WordByImage.displayName = 'WordByImage'
