'use client'

import { useState } from 'react'

import { type IChoiceRightTask } from '../LearningContent'

import { type ISelectItem } from './SelectAnswerQuizContent'

export const useSelectAnswerQuiz = ({
	setError,
	data,
}: {
	setError: (value: boolean) => void
	data: IChoiceRightTask
}) => {
	const [variants, setVariants] = useState(data.variants)
	const [selected, setSelected] = useState<ISelectItem[]>([])
	let correctAnswersCount = 0
	variants.forEach(el => {
		if (el.correct === true) {
			correctAnswersCount++
		}
	})
	// eslint-disable-next-line no-console
	console.log(correctAnswersCount)
	const onSelect = (item: ISelectItem) => {
		setSelected(prev => {
			if (prev.find(el => el.id === item.id)) {
				return prev.filter(el => el.id !== item.id)
			}

			return [...prev, item]
		})
	}
	const checkSelected = (item: ISelectItem) => {
		return selected.includes(item) ? true : false
	}
	const checkCorrect = (variants: ISelectItem[]) => {
		if (variants.length === 0) return
		if (variants.length !== correctAnswersCount) {
			setError(true)
			return
		}
		variants.forEach(el => {
			if (el.correct === false) {
				setError(true)
			} else {
				setError(false)
			}
		})
	}
	const disableButton = () => {
		if (selected.length === 0) {
			return true
		}
		return false
	}
	// useEffect(() => {
	//     checkCorrect(selected);
	// }, [checkCorrect, variants, selected])
	return {
		variants,
		selected,
		setVariants,
		setSelected,
		onSelect,
		checkSelected,
		checkCorrect,
		disableButton,
	}
}
