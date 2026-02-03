import { createColumnHelper } from '@tanstack/react-table'
import cn from 'classnames'

import { SortableHeader } from '@/components/Admin/SortableHeader'
import { minutesToHoursAndMinutes } from '@/shared/admin/utils'
import { type Role } from '@/shared/types/admin/auth'
import { type SchoolDepItem } from '@/shared/types/admin/types'

const columnHelper = createColumnHelper<SchoolDepItem>()

export const getColumnsSchool = ({ role }: { role?: Role }) => [
	columnHelper.accessor('place', {
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
	columnHelper.accessor('schoolName', {
		header: ({ column }) => <SortableHeader<SchoolDepItem, string> title="Школа" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={info.getValue()} className="TableItem__name">
				{info.getValue()}
			</span>
		),
	}),
	...(role === 'ministry'
		? [
				columnHelper.accessor('department', {
					header: ({ column }) => (
						<SortableHeader<SchoolDepItem, string> title="Управление" column={column} />
					),
					enableSorting: true,
					sortingFn: 'alphanumeric',
					cell: info => (
						<span title={info.getValue()} className="TableItem__name">
							{info.getValue()}
						</span>
					),
				}),
			]
		: []),
	// ...(type === 'parallel'
	//   ? [columnHelper.accessor('class', {
	//     header: ({ column }: { column: Column<Student, string> }) => <SortableHeader<Student, string> title="Класс" column={column} />,
	//     enableSorting: true,
	//     sortingFn: 'alphanumeric',
	//     cell: info => <span title={info.getValue()} className='TableItem__class'>{info.getValue() || '—'}</span>
	//   })]
	//   : []),
	// columnHelper.accessor("department", {
	//   header: ({ column }) => <SortableHeader<SchoolDepItem, string> title="Управление" column={column} />,
	//   enableSorting: true,
	//   sortingFn: 'text',
	//   cell: info => {
	//     const value = info.getValue();
	//     // Пустая строка означает, что исходное значение было null/undefined
	//     if (value === '') {
	//       console.log(role);
	//       return null
	//     };

	//     return <span title={value} className='TableItem__schoolName'>{value}</span>;
	//   }
	// }),

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
