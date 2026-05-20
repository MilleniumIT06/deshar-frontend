'use client'
import dynamic from 'next/dynamic'
import { useAppSelector } from '@/app/_store/hooks'
import { AttestationPaginator } from '@/components/AttestationPaginator'
import { type Task } from '@/components/LearningContent'

import './styles.scss'

const DragDropTrainer = dynamic(() => import('@/components/DragDropTrainer').then(mod => mod.DragDropTrainer), {
	ssr: false,
	loading: () => <div className="animate-pulse h-40 bg-gray-50" />,
})

const MissedLetterTrainer = dynamic(
	() => import('@/components/MissedLetterTrainer').then(mod => mod.MissedLetterTrainer),
	{ ssr: false },
)

const SelectAnswerQuiz = dynamic(() => import('@/components/SelectAnswerQuiz').then(mod => mod.SelectAnswerQuiz), {
	ssr: false,
})

export const LearningAttestation = () => {
	const { data, currentTaskNumber } = useAppSelector(state => state.learningAttestationReducer)
	const currentTask: Task | undefined = data[currentTaskNumber - 1]

	const renderTask = () => {
		if (!currentTask) return <div>Task not found</div>

		switch (currentTask.type) {
			case 'missing-word':
				return <MissedLetterTrainer data={currentTask as any} />
			case 'missing-dnd':
				// Теперь dnd-kit загрузится ТОЛЬКО при попадании в этот кейс
				return <DragDropTrainer data={currentTask as any} />
			case 'choice-right':
				return <SelectAnswerQuiz data={currentTask as any} />
			default:
				return <div>Error</div>
		}
	}

	return (
		<div className="LearningAttestation">
			<AttestationPaginator />
			{renderTask()}
		</div>
	)
}
