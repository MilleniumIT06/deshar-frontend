import { useState, useCallback } from 'react'

interface WordState {
	text: string
	isCorrect: boolean
	isSelected: boolean
}

interface UseWordPickerProps {
	text: string
	correctValues: string[]
	changeStatus: (status: 'idle' | 'error' | 'success' | 'checking' | 'attempts-left') => void
}

export const useWordPicker = ({ text, correctValues, changeStatus }: UseWordPickerProps) => {
	const [words, setWords] = useState<WordState[]>(() => {
		const regex = /([^\s"']+|"[^"]*"|'[^']*')/g
		const matches = text.match(regex) || []

		return matches.map(word => ({
			text: word,
			isCorrect: correctValues.some(correct => word.includes(correct) || correct.includes(word)),
			isSelected: false,
		}))
	})

	const toggleWord = useCallback((index: number) => {
		setWords(prev => prev.map((word, i) => (i === index ? { ...word, isSelected: !word.isSelected } : word)))
	}, [])

	const reset = useCallback(() => {
		setWords(prev => prev.map(word => ({ ...word, isSelected: false })))
		changeStatus('idle')
	}, [changeStatus])

	return {
		words,
		toggleWord,
		reset,
	}
}
