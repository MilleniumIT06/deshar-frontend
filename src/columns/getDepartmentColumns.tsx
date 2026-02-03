import { createColumnHelper } from '@tanstack/react-table'
import cn from 'classnames'

import { SortableHeader } from '@/components/Admin/SortableHeader'
import { minutesToHoursAndMinutes } from '@/shared/admin/utils'
import { type DepartamentItem } from '@/shared/types/admin/types'

const columnHelper = createColumnHelper<DepartamentItem>()

export const getDepartmentColumns = () => [
	columnHelper.accessor('placeNumber', {
		header: ({ column }) => <SortableHeader title="Место" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => {
			const placeNumber = info.getValue()

			return (
				<div className={cn('TableItem__place')}>
					<span>{placeNumber}</span>
				</div>
			)
		},
	}),
	columnHelper.accessor('departmentName', {
		header: ({ column }) => <SortableHeader<DepartamentItem, string> title="Упр. образования" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={info.getValue()} className="TableItem__name">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('schoolsCount', {
		header: ({ column }) => <SortableHeader title="Кол. школ" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__time">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('studentsCount', {
		header: ({ column }) => <SortableHeader title="Кол. учеников" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__time">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('learningTime', {
		header: ({ column }) => <SortableHeader title="Время обучения" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => (
			<span title={minutesToHoursAndMinutes(info.getValue())} className="TableItem__time">
				{minutesToHoursAndMinutes(info.getValue())}
			</span>
		),
	}),
	columnHelper.accessor('doneModules', {
		header: ({ column }) => <SortableHeader title="Выполнено модулей" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__modules">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('points', {
		header: ({ column }) => <SortableHeader title="Баллы" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__points">
				{info.getValue()}
			</span>
		),
	}),
]
