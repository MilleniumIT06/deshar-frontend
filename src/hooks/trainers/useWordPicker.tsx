import { useState, useCallback } from 'react'

interface WordState {
	text: string
	isCorrect: boolean
	isSelected: boolean
}

interface UseWordPickerProps {
	text: string
	correctValues: string[]
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
}

export const useWordPicker = ({ text, correctValues, onSuccess, onError, changeStatus }: UseWordPickerProps) => {
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

	const checkResult = useCallback(() => {
		const selectedWords = words.filter(w => w.isSelected)
		const correctWords = words.filter(w => w.isCorrect)

		const isAllCorrect =
			selectedWords.length === correctWords.length && selectedWords.every(word => word.isCorrect)

		if (isAllCorrect && selectedWords.length > 0) {
			onSuccess()
			changeStatus('success')
		} else {
			onError()
			changeStatus('error')
		}
	}, [words, onSuccess, onError, changeStatus])

	const reset = useCallback(() => {
		setWords(prev => prev.map(word => ({ ...word, isSelected: false })))
		changeStatus('idle')
	}, [changeStatus])

	return {
		words,
		toggleWord,
		checkResult,
		reset,
	}
}
