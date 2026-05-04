import { useState, forwardRef, useImperativeHandle } from 'react'
import { FixSentenceItem } from './item'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import './styles.scss'

interface FixSentenceProps {
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	payload: {
		sentence: string
		words: string[]
		correctAnswer: string
	}
}

export const FixSentence = forwardRef(
	({ payload, onSuccess, onError, changeStatus, title, subTitle }: FixSentenceProps, ref) => {
		const [selectedIndex, setSelectedIndex] = useState<number>(0)

		useImperativeHandle(ref, () => ({
			handleCheck: () => {
				const isCorrect = payload.words[selectedIndex] === payload.correctAnswer
				if (isCorrect) {
					changeStatus('success')
					onSuccess()
				} else {
					changeStatus('error')
					onError()
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
				<span className="trainer-number-title">Тренажер 1</span>
				<TrainerTitle title={title} />

				{subTitle && <h2 className="fix-sentence__subtitle">{subTitle}</h2>}

				<div className="fix-sentence__content">{renderSentence()}</div>
			</div>
		)
	},
)

FixSentence.displayName = 'FixSentence'
