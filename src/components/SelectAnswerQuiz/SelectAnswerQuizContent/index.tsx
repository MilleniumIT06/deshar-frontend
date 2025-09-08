import cn from 'classnames'

import { SelectBox } from '../SelectBox'

import './styles.scss'

export interface ISelectItem {
	id: number
	content: string
	correct: boolean
}
export const SelectAnswerQuizContent = ({
	checkSelected,
	data,
	onSelect,
}: {
	data: ISelectItem[]
	selected: ISelectItem[]
	setError: (value: boolean) => void
	onSelect: (item: ISelectItem) => void
	checkSelected: (item: ISelectItem) => boolean
	checkCorrect: (data: ISelectItem[]) => void
}) => {
	return (
		<div className="SelectAnswerQuizContent">
			<ul className={cn('list-reset', 'SelectAnswerQuizContent__list')}>
				{data.map(item => (
					<SelectBox
						title={item.content}
						handleSelect={() => onSelect(item)}
						selected={checkSelected(item)}
						key={item.id}
					/>
				))}
			</ul>
		</div>
	)
}
