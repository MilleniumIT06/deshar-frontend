import { createColumnHelper } from '@tanstack/react-table'

import { SortableHeader } from '@/components/Admin/SortableHeader'
import { type Role } from '@/shared/types/admin/auth'
import { type AttestationStatus } from '@/shared/types/admin/types'
import { StateChip } from '@/shared/ui/Admin/StateChip'

export type AttestationsTableItemType = {
	id: number
	date: Date
	studentName: string
	subjectName: string
	module: string
	mistakes: number
	points: number
	attestationStatus: AttestationStatus
	schoolName: string
}
const columnHelper = createColumnHelper<AttestationsTableItemType>()

export const getAttestationsColumns = ({ role }: { role?: Role }) => [
	columnHelper.accessor('date', {
		header: ({ column }) => <SortableHeader<AttestationsTableItemType, Date> title="Дата" column={column} />,
		enableSorting: true,
		sortingFn: 'datetime',
		cell: info => (
			<span title={info.getValue().toISOString()} className="TableItem__date">
				{info.getValue().toLocaleDateString()}
			</span>
		),
	}),
	//  ...(type === 'parallel'
	//     ? [columnHelper.accessor('class', {
	//       header: ({ column }: { column: Column<Student, string> }) => <SortableHeader<Student, string> title="Класс" column={column} />,
	//       enableSorting: true,
	//       sortingFn: 'alphanumeric',
	//       cell: info => <span title={info.getValue()} className='tableItem__class'>{info.getValue() || '—'}</span>
	//     })]
	//     : []),
	...(role === 'department'
		? [
				columnHelper.accessor('schoolName', {
					header: ({ column }) => (
						<SortableHeader<AttestationsTableItemType, string> title="Школа" column={column} />
					),
					enableSorting: true,
					sortingFn: 'text',
					cell: info => (
						<span title={info.getValue()} className="TableItem__schoolName">
							{info.getValue()}
						</span>
					),
				}),
			]
		: []),
	columnHelper.accessor('studentName', {
		header: ({ column }) => <SortableHeader<AttestationsTableItemType, string> title="Ученик" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue()} className="TableItem__name">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('subjectName', {
		header: ({ column }) => <SortableHeader<AttestationsTableItemType, string> title="Предмет" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue()} className="TableItem__subject">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('module', {
		header: ({ column }) => <SortableHeader<AttestationsTableItemType, string> title="Модуль" column={column} />,
		enableSorting: true,
		sortingFn: 'text',
		cell: info => (
			<span title={info.getValue()} className="TableItem__module">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('mistakes', {
		header: ({ column }) => <SortableHeader<AttestationsTableItemType, number> title="Ошибки" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__mistakes">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('points', {
		header: ({ column }) => <SortableHeader<AttestationsTableItemType, number> title="Баллы" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => (
			<span title={String(info.getValue())} className="TableItem__points">
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('attestationStatus', {
		header: ({ column }) => <SortableHeader title="Аттестация" column={column} />,
		cell: info => (
			<div>
				<StateChip state={info.getValue()} />
			</div>
		),
		enableSorting: true,
		sortingFn: 'alphanumeric',
	}),
]
