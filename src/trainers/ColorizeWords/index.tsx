import cn from 'classnames'
import { forwardRef, useImperativeHandle, useState } from 'react'

import './styles.scss'
import { EngineButton } from '@/components/Engine/Button'
import { useCheckAnswer } from '@/hooks/trainers/useCheckAnswer'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { type TrainerCommonProps } from '@/widgets/trainers-engine/types/types'

import type { Id } from '@/shared/types/types'

export interface Tool {
	type: 'paint' | 'erase'
	toolColor?: string
	toolName: string
}

interface IVariant {
	id: number | string
	content: string
	correctColor: string
}

interface ColorizeWordsProps extends TrainerCommonProps {
	payload: {
		variants: IVariant[]
		tools: Tool[]
	}
}

interface WordState extends IVariant {
	color: string | null
}

export const ColorizeWords = forwardRef(
	({ payload, title, subTitle, onSuccess, onError, changeStatus, currentTrainerIndex, audio }: ColorizeWordsProps, ref) => {
		const { variants, tools } = payload

		const [selectedTool, setSelectedTool] = useState<Tool>(tools[0])
		const [words, setWords] = useState<WordState[]>(
			variants.map(item => ({
				...item,
				color: null,
			})),
		)
		const { checkAnswer } = useCheckAnswer()
		useImperativeHandle(ref, () => ({
			handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
				if (!moduleId || !pieceId || !lessonId || !taskId) return

				const isCorrectClient = words.every(word => word.color === word.correctColor)
				changeStatus(isCorrectClient ? 'success' : 'error')

				const formattedAnswers = words.map(word => ({
					[word.id]: word.color,
				}))

				const data = await checkAnswer({
					moduleId,
					pieceId,
					lessonId,
					taskId,
					answer: formattedAnswers,
					timeSpent: timeSpent ?? 0,
				})

				// if (data?.is_correct || (data?.is_completed && isCorrectClient)) {
				// 	onSuccess()
				// } else {
				// 	onError()
				// }
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
				if (isCorrectClient !== data?.is_correct) {
					// eslint-disable-next-line no-console
					console.warn('Client/server mismatch on answer check', {
						taskId,
						isCorrectClient,
						serverResult: data?.is_correct,
					})
				}

				return Boolean(data?.is_correct)
			},
			handleReset: () => {
				setWords(prev => prev.map(word => ({ ...word, color: null })))
				changeStatus('idle')
			},
		}))

		const handleWordClick = (wordId: number | string) => {
			setWords(prev =>
				prev.map(word => {
					if (word.id === wordId) {
						return {
							...word,
							color: selectedTool.type === 'erase' ? null : selectedTool.toolColor || null,
						}
					}
					return word
				}),
			)
		}

		return (
			<div className="colorize-words">
				<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
				<TrainerTitle title={title} audio={audio} />

				{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

				<div className="colorize-words__content">
					<div className="colorize-words__grid">
						{words.map(word => (
							<div
								key={word.id}
								onClick={() => handleWordClick(word.id)}
								style={{ backgroundColor: word.color || 'var(--neutral-white)' }}
								className={cn('colorize-words__word-card', word.color && 'filled')}>
								<span>{word.content}</span>
							</div>
						))}
					</div>

					<div className="colorize-words__toolbar">
						{tools.map((tool, index) => (
							<EngineButton
								key={`${index}-${tool.toolName}`}
								onClick={() => setSelectedTool(tool)}
								variant="primary"
								className={cn('tool-button', selectedTool.toolName === tool.toolName && 'tool-button--selected')}>
								<div className="tool-content">
									{tool.type === 'paint' && <i className="color-indicator" style={{ backgroundColor: tool.toolColor }} />}
									<span>{tool.toolName}</span>
								</div>
							</EngineButton>
						))}
					</div>
				</div>
			</div>
		)
	},
)

ColorizeWords.displayName = 'ColorizeWords'
