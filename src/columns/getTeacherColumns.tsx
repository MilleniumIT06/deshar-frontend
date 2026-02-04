import { createColumnHelper } from '@tanstack/react-table'

import { SortableHeader } from '@/components/Admin/SortableHeader'
import { type TeacherItem } from '@/shared/types/admin/types'

const columnHelper = createColumnHelper<TeacherItem>()

export const getTeacherColumns = () => [
	columnHelper.accessor('place', {
		header: ({ column }) => <SortableHeader title="Место" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => {
			const placeNumber = info.getValue()

			return (
				<div className={'TableItem__place'}>
					<span>{placeNumber}</span>
				</div>
			)
		},
	}),
	columnHelper.accessor('teacherName', {
		header: ({ column }) => <SortableHeader<TeacherItem, string> title="Учитель" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={info.getValue()} className="TableItem__name">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('schoolName', {
		header: ({ column }) => <SortableHeader<TeacherItem, string> title="Школа" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={info.getValue()} className="TableItem__name">
				{info.getValue()}
			</span>
		),
	}),

	columnHelper.accessor('classes', {
		header: ({ column }) => <SortableHeader title="Классы" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => {
			let value = ''
			info.getValue().forEach((item, index) => {
				value += `${item.classLevel}“${item.classLetter}”`
				if (index !== info.getValue().length - 1) {
					value += ', '
				}
			})
			return (
				<span title={value} className="TableItem__classes">
					{value}
				</span>
			)
		},
	}),
	columnHelper.accessor('studentsCount', {
		header: ({ column }) => <SortableHeader title="Кол. учеников" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__studentsCount">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('doneModules', {
		header: ({ column }) => <SortableHeader title="Вып. модулей" column={column} />,
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
