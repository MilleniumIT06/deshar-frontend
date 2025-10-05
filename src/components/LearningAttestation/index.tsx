'use client'
import { useAppSelector } from '@/app/_store/hooks'
import { AttestationPaginator } from '@/components/AttestationPaginator'
import { DragDropTrainer } from '@/components/DragDropTrainer'
import { type Task } from '@/components/LearningContent'
import { MissedLetterTrainer } from '@/components/MissedLetterTrainer'
import { SelectAnswerQuiz } from '@/components/SelectAnswerQuiz'

import './styles.scss'

export const LearningAttestation = () => {
	const { data, currentTaskNumber } = useAppSelector(state => state.learningAttestationReducer)

	const currentTask: Task | undefined = data[currentTaskNumber - 1]
	const renderTask = () => {
		if (!currentTask) return <div>Task not found</div>
		switch (currentTask.type) {
			case 'missing-word':
				return (
					<MissedLetterTrainer
						data={{
							id: currentTask.id,
							missingWords: currentTask.missingWords,
							sentence: currentTask.sentence,
							type: currentTask.type,
						}}
					/>
				)
			case 'missing-dnd':
				return (
					<DragDropTrainer
						data={{
							id: currentTask.id,
							letters: currentTask.letters,
							missingWords: currentTask.missingWords,
							sentence: currentTask.sentence,
							slots: currentTask.slots,
							type: currentTask.type,
						}}
					/>
				)
			case 'choice-right':
				return (
					<SelectAnswerQuiz
						data={{
							id: currentTask.id,
							title: currentTask.title,
							type: currentTask.type,
							variants: currentTask.variants,
							completed: currentTask.completed,
						}}
					/>
				)
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
