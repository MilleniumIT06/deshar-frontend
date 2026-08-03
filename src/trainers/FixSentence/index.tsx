import { useState, forwardRef, useImperativeHandle } from 'react'

import { useCheckAnswer } from '@/hooks/trainers/useCheckAnswer'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { FixSentenceItem } from './item'

import './styles.scss'

import type { Id, TrainerCommonProps } from '@/shared/types/types'

interface FixSentenceProps extends TrainerCommonProps {
	payload: {
		sentence: string
		words: string[]
		correctAnswer: string
	}
}

export const FixSentence = forwardRef(
	({ payload, onSuccess, onError, changeStatus, title, subTitle, currentTrainerIndex,audio }: FixSentenceProps, ref) => {
		const [selectedIndex, setSelectedIndex] = useState<number>(0)
		const { checkAnswer, isLoading } = useCheckAnswer()

useImperativeHandle(ref, () => ({
    handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
        if (isLoading) return
		 if (!moduleId || !pieceId || !lessonId || !taskId) return
        const selectedAnswer = payload.words[selectedIndex]

        const isCorrectClient = selectedAnswer === payload.correctAnswer

        if (isCorrectClient) {
            changeStatus('success')
        } else {
            changeStatus('error')
        }

        const data = await checkAnswer({
            moduleId,
            pieceId,
            lessonId,
            taskId,
            answer: selectedAnswer,
            timeSpent: timeSpent||0,
        })

        if (!data) return

        if (data.is_correct) {
            changeStatus('success')
            onSuccess()
        } else {
            changeStatus('error')
            onError()
        }

        if (isCorrectClient !== data.is_correct) {
            // eslint-disable-next-line no-console
            console.warn('Client/server mismatch on answer check', {
                taskId: taskId,
                isCorrectClient,
                serverResult: data.is_correct,
            })
        }
    },
    handleReset: () => {
        setSelectedIndex(0)
        changeStatus('idle')
    },
}))

		const handleSelect = (index: number) => {
			setSelectedIndex(index)
			changeStatus('idle')
		}

		const renderSentence = () => {
			const { sentence, words } = payload
			const parts = sentence.split(/(\{\{\d+\}\})/)

			return parts.map((part, index) => {
				if (part.match(/\{\{\d+\}\}/)) {
					return (
						<FixSentenceItem
							key={index}
							words={words}
							onSelect={handleSelect}
							selectedIndex={selectedIndex}
							itemHeight={48}
						/>
					)
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
				<TrainerTitle title={title} audio={audio}/>

				{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

				<div className="fix-sentence__content">{renderSentence()}</div>
			</div>
		)
	},
)

FixSentence.displayName = 'FixSentence'
