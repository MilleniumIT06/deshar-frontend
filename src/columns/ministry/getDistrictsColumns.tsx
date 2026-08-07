import { createColumnHelper } from '@tanstack/react-table'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type { IMinistryDistrict } from '@/services/types/ministy.types'

const columnHelper = createColumnHelper<IMinistryDistrict>()

export const getDistrictsColumns = () => [
	columnHelper.accessor('name', {
		header: ({ column }) => <SortableHeader<IMinistryDistrict, string> title="Название" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue()} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('region', {
		header: ({ column }) => <SortableHeader<IMinistryDistrict, string> title="Регион" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue()} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('total_schools', {
		header: ({ column }) => <SortableHeader<IMinistryDistrict, number> title="Кол-во школ" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('total_students', {
		header: ({ column }) => <SortableHeader<IMinistryDistrict, number> title="Кол-во учеников" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('total_points', {
		header: ({ column }) => <SortableHeader<IMinistryDistrict, number> title="Баллы" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
]
