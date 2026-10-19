'use client'
import { type DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useState, useEffect, useCallback } from 'react'

export interface IWordSlot {
	id: number | string
	current: string | null
}
export interface ILetter {
	id: number | string
	letter: string
}

interface UseWordTrainerProps {
	id: string | number
	correctAnswer: string
	availableLetters: ILetter[]
	changeStatus: (status: 'idle' | 'error' | 'success' | 'checking' | 'attempts-left') => void
}

export const useWordTrainer = ({ id, correctAnswer, availableLetters, changeStatus }: UseWordTrainerProps) => {
	const [slots, setSlots] = useState<IWordSlot[]>([])
	const [letters, setLetters] = useState<ILetter[]>([])

	useEffect(() => {
		setSlots(Array.from({ length: correctAnswer.length }, (_, i) => ({ id: i + 1, current: null })))
		setLetters(availableLetters.map((letter, i) => ({ id: i + 1, letter: letter.letter })))
	}, [id, correctAnswer, availableLetters])

	const sensors = useSensors(useSensor(TouchSensor), useSensor(MouseSensor))

	const handleDragEnd = useCallback((event: DragEndEvent) => {
		const { active, over } = event
		if (over) {
			setSlots(prev => prev.map(slot => (slot.id === over.id ? { ...slot, current: active.data.current?.char } : slot)))
		}
	}, [])

	const handleReset = useCallback(() => {
		changeStatus('idle')
		setSlots(prev => prev.map(slot => ({ ...slot, current: null })))
	}, [changeStatus])

	const disableMoveBox = (letter: ILetter) => {
		const usedCount = slots.filter(slot => slot.current === letter.letter).length
		const availableCount = letters.filter(l => l.letter === letter.letter).length
		return usedCount >= availableCount
	}

	return {
		slots,
		letters,
		sensors,
		handleDragEnd,
		handleReset,
		disableMoveBox,
	}
}
