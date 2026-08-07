import { createColumnHelper } from '@tanstack/react-table'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type { IMinistrySchool } from '@/services/types/ministy.types'

const columnHelper = createColumnHelper<IMinistrySchool>()

export const getSchoolsColumns = () => [
	columnHelper.accessor('name', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, string> title="Название" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue()} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('address', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, string | null> title="Адрес" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue() || 'не указан'} className="TableItem__value">
				{info.getValue() || 'не указан'}
			</span>
		),
	}),
	columnHelper.accessor('phone', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, string | null> title="Телефон" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue() || 'не указан'} className="TableItem__value">
				{info.getValue() || 'не указан'}
			</span>
		),
	}),
	columnHelper.accessor('email', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, string | null> title="E-mail" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue() || 'не указан'} className="TableItem__value">
				{info.getValue() || 'не указан'}
			</span>
		),
	}),
	columnHelper.accessor('district', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, string | null> title="Район" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue() || '_'} className="TableItem__value">
				{info.getValue() || '_'}
			</span>
		),
	}),
	columnHelper.accessor('region', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, string> title="Регион" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue()} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('total_teachers', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, number> title="Кол-во учителей" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('total_classes', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, number> title="Кол-во классов" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('total_students', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, number> title="Кол-во учеников" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('total_points', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, number> title="Баллы" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('average_points', {
		header: ({ column }) => <SortableHeader<IMinistrySchool, number> title="Ср. балл" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__value">
				{info.getValue()}
			</span>
		),
	}),
]
