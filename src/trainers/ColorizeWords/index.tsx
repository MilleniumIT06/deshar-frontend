import { forwardRef, useImperativeHandle, useState } from 'react'
import './styles.scss'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { EngineButton } from '@/components/Engine/Button'
import cn from 'classnames'

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

interface ColorizeWordsProps {
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	payload: {
		variants: IVariant[]
		tools: Tool[]
	}
}

interface WordState extends IVariant {
	color: string | null
}

export const ColorizeWords = forwardRef(
	({ payload, title, subTitle, onSuccess, onError, changeStatus }: ColorizeWordsProps, ref) => {
		const { variants, tools } = payload

		const [selectedTool, setSelectedTool] = useState<Tool>(tools[0])
		const [words, setWords] = useState<WordState[]>(
			variants.map(item => ({
				...item,
				color: null,
			})),
		)

		useImperativeHandle(ref, () => ({
			handleCheck: () => {
				const isCorrect = words.every(word => word.color === word.correctColor)

				if (isCorrect) {
					onSuccess()
					changeStatus('success')
				} else {
					onError()
					changeStatus('error')
				}
				return isCorrect
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
				<TrainerTitle title={title} />

				{subTitle && <h2 className="colorize-words__subtitle">{subTitle}</h2>}

				<div className="colorize-words__content">
					<div className="colorize-words__grid">
						{words.map(word => (
							<div
								key={word.id}
								onClick={() => handleWordClick(word.id)}
								style={{ backgroundColor: word.color || 'var(--neutral-white)' }}
								className="colorize-words__word-card">
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
								className={cn(
									'tool-button',
									selectedTool.toolName === tool.toolName && 'tool-button--selected',
								)}>
								<div className="tool-content">
									{tool.type === 'paint' && (
										<i
											className="color-indicator"
											style={{ backgroundColor: tool.toolColor }}
										/>
									)}
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
