/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useImperativeHandle, type Ref } from 'react'

interface UseLetterClickTrainerProps {
	ref: Ref<any>
	correctIds: (number | string)[]
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	isMulti?: boolean
}

export function useLetterClickTrainer({
	ref,
	correctIds,
	onSuccess,
	onError,
	changeStatus,
	isMulti = false,
}: UseLetterClickTrainerProps) {
	const [selectedIds, setSelectedIds] = useState<(number | string)[]>([])

	useImperativeHandle(ref, () => ({
		handleCheck: () => {
			if (selectedIds.length === 0) return

			let isCorrect = false

			if (isMulti) {
				isCorrect =
					selectedIds.length === correctIds.length && selectedIds.every(id => correctIds.includes(id))
			} else {
				isCorrect = selectedIds.length === 1 && correctIds.includes(selectedIds[0])
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
			setSelectedIds([])
			changeStatus('idle')
		},
	}))

	const handleSelect = (id: number | string) => {
		changeStatus('idle')

		setSelectedIds(prev => {
			if (!isMulti) return [id]

			return prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
		})
	}

	return {
		selectedIds,
		handleSelect,
	}
}
