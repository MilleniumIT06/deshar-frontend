import type { ReactNode } from 'react'

import cn from 'classnames'

import type { Column } from '@tanstack/react-table'

interface SortableHeaderProps<TData, TValue> {
	title: string | ReactNode
	column: Column<TData, TValue>
	className?: string
	showSortIndicator?: boolean
	align?: 'left' | 'center' | 'right'
}

export const SortableHeader = <TData, TValue>({
	title,
	column,
	className,
	showSortIndicator = true,
	align = 'left',
}: SortableHeaderProps<TData, TValue>) => {
	const sortDirection = column.getIsSorted()

	return (
		<div
			className={cn(
				'sortable-header',
				`sortable-header--${align}`,
				{
					'sortable-header--sortable': column.getCanSort(),
					'sortable-header--sorted': showSortIndicator && sortDirection,
				},
				className,
			)}
			onClick={column.getToggleSortingHandler()}
			style={{ cursor: column.getCanSort() ? 'pointer' : 'default' }}>
			<span>{title}</span>
		</div>
	)
}
