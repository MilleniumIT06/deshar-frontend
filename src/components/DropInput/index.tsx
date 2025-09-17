'use client'
import { useDroppable } from '@dnd-kit/core'
import cn from 'classnames'
import './styles.scss'

export const DropInput = ({
	id,
	current,
	word,
	missingLetter,
}: {
	id: number | string
	current: string | null
	word: string
	missingLetter: string
}) => {
	const { setNodeRef } = useDroppable({ id })
	const check = word && missingLetter
	const letterIndex = word.indexOf(missingLetter)

	if (letterIndex === -1) {
		return (
			<span key={id} className="DropInput__error">
				[Ошибка в данных]
			</span>
		)
	}
	const before = check && letterIndex && word.substring(0, letterIndex)
	const after = check && letterIndex && word.substring(letterIndex + 1)
	return (
		<span className="DropInput__wrapper">
			{before}
			<span ref={setNodeRef} className={cn('DropInput', current !== null && 'DropInput--filled')}>
				{current || ''}
			</span>
			{after}
		</span>
	)
}
