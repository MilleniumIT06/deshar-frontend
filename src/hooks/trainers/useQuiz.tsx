/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useImperativeHandle, type Ref } from 'react'

interface UseQuizLogicProps<T> {
	ref: Ref<any>
	correctValue: T | T[]
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
}

export function useQuizLogic<T>({ ref, correctValue, onSuccess, onError, changeStatus }: UseQuizLogicProps<T>) {
	// Автоматически определяем, мульти-выбор это или нет
	const isMulti = Array.isArray(correctValue)

	const [isSubmitted, setIsSubmitted] = useState(false)
	// Инициализируем пустым массивом, если это мульти-выбор
	const [selected, setSelected] = useState<T | T[]>(isMulti ? [] : (null as any))

	useImperativeHandle(ref, () => ({
		handleCheck: () => {
			const hasSelection = isMulti ? (selected as T[]).length > 0 : selected !== null

			if (!hasSelection) return

			setIsSubmitted(true)

			let isCorrect = false
			if (isMulti && Array.isArray(correctValue)) {
				const selectedArray = selected as T[]
				isCorrect =
					selectedArray.length === correctValue.length &&
					selectedArray.every(v => correctValue.includes(v))
			} else {
				isCorrect = selected === correctValue
			}

			if (isCorrect) {
				onSuccess()
				changeStatus('success')
			} else {
				onError()
				changeStatus('error')
			}
		},
		handleReset: () => {
			setIsSubmitted(false)
			setSelected(isMulti ? [] : (null as any))
			changeStatus('idle')
		},
	}))

	const handleSelect = (id: any) => {
		if (isSubmitted) {
			setIsSubmitted(false)
			changeStatus('idle')
		}

		setSelected(prev => {
			if (!isMulti) return id

			const arr = Array.isArray(prev) ? prev : []
			return arr.includes(id) ? arr.filter(v => v !== id) : [...arr, id]
		})
	}

	return {
		selected,
		isSubmitted,
		handleSelect,
	}
}
