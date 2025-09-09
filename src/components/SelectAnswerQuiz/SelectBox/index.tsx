import cn from 'classnames'

import './styles.scss'

export const SelectBox = ({
	title = 'test',
	selected,
	handleSelect,
}: {
	title: string
	selected: boolean
	handleSelect: () => void
}) => {
	return (
		<li className={cn('SelectBox', selected && 'selected')} onClick={handleSelect}>
			{title}
		</li>
	)
}
