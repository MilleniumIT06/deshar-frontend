import { useState, forwardRef, useImperativeHandle } from 'react'

import { useTrainerCheck } from '@/hooks/trainers/useTrainerCheck'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { type TrainerCommonProps } from '@/widgets/trainers-engine/types/types'

import { FixSentenceItem } from './item'

import './styles.scss'

import type { Id } from '@/shared/types/types'

interface FixSentenceProps extends TrainerCommonProps {
	payload: {
		sentence: string
		words: string[]
		correctAnswer: string
	}
}

export const FixSentence = forwardRef(
	({ payload, onSuccess, onError, changeStatus, title, subTitle, currentTrainerIndex, audio, isAlreadyCompleted }: FixSentenceProps, ref) => {
		const [selectedIndex, setSelectedIndex] = useState<number>(0)

		const { runCheck, isCheckingRef } = useTrainerCheck({
			isCompleted: isAlreadyCompleted ?? false,
			onSuccess,
			onError,
			changeStatus,
		})

		useImperativeHandle(ref, () => ({
			handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
				const selectedAnswer = payload.words[selectedIndex]
				const isCorrectClient = selectedAnswer === payload.correctAnswer

				await runCheck(isCorrectClient, {
					moduleId,
					pieceId,
					lessonId,
					taskId,
					answer: selectedAnswer,
					timeSpent,
				})
			},
			handleReset: () => {
				setSelectedIndex(0)
				changeStatus('idle')
			},
		}))

		const handleSelect = (index: number) => {
			if (isCheckingRef.current) return
			setSelectedIndex(index)
			changeStatus('idle')
		}

		const renderSentence = () => {
			const { sentence, words } = payload
			const parts = sentence.split(/(\{\{\d+\}\})/)

			return parts.map((part, index) => {
				if (part.match(/\{\{\d+\}\}/)) {
					return <FixSentenceItem key={index} words={words} onSelect={handleSelect} selectedIndex={selectedIndex} itemHeight={48} />
				}
				return (
					<span key={index} className="fix-sentence__part">
						{part}
					</span>
				)
			})
		}

		return (
			<div className="fix-sentence">
				<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
				<TrainerTitle title={title} audio={audio} />

				{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

				<div className="fix-sentence__content">{renderSentence()}</div>
			</div>
		)
	},
)

FixSentence.displayName = 'FixSentence'
