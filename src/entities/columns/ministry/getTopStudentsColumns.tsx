import { createColumnHelper } from '@tanstack/react-table'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type { UniqueDistrictTopStudent } from '@/services/types/ministy.types'

const columnHelper = createColumnHelper<UniqueDistrictTopStudent>()

export const getTopStudentsColumns = () => [
	columnHelper.accessor('level', {
		header: ({ column }) => <SortableHeader<UniqueDistrictTopStudent, number> title="Уровень" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('name', {
		header: ({ column }) => <SortableHeader<UniqueDistrictTopStudent, string> title="Имя" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue()} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('points', {
		header: ({ column }) => <SortableHeader<UniqueDistrictTopStudent, number> title="Баллы" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('class', {
		header: ({ column }) => <SortableHeader<UniqueDistrictTopStudent, string> title="Класс" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('school', {
		header: ({ column }) => <SortableHeader<UniqueDistrictTopStudent, string> title="Школа" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
]
