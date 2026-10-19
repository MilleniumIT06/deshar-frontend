import { createColumnHelper } from '@tanstack/react-table'

import { ProgressBarAdmin } from '@/components/Admin/ProgressBarAdmin'
import { SortableHeader } from '@/components/Admin/SortableHeader'
import { type StudentTableItemType } from '@/components/Admin/StudentTable'
import { StateChip } from '@/shared/ui/Admin/StateChip'

const columnHelper = createColumnHelper<StudentTableItemType>()

// Define columns
export const getStudentTableColumns = () => [
	columnHelper.accessor('id', {
		header: ({ column }) => <SortableHeader title="#" column={column} />,
		cell: info => info.getValue(),
		enableSorting: true,
		sortingFn: 'basic',
	}),
	columnHelper.accessor('module', {
		header: ({ column }) => <SortableHeader title="Модуль" column={column} />,
		enableSorting: true,
		sortingFn: 'alphanumeric',
		cell: info => info.getValue(),
	}),
	columnHelper.accessor(row => row, {
		id: 'lessons',
		header: ({ column }) => <SortableHeader title="Уроки" column={column} />,
		enableSorting: true,
		sortingFn: 'auto',
		cell: info => (
			<div>
				<ProgressBarAdmin
					doneLessons={info.row.original.doneLessons}
					maxLessons={info.row.original.maxLessons}
					processLessons={info.row.original.processLessons}
				/>
			</div>
		),
	}),
	columnHelper.accessor('learningTime', {
		header: ({ column }) => <SortableHeader title="Время обучения" column={column} />,
		cell: info => info.getValue(),
		enableSorting: true,
		sortingFn: 'auto',
	}),
	columnHelper.accessor('mistakes', {
		header: ({ column }) => <SortableHeader title="Ошибки" column={column} />,
		cell: info => info.getValue(),
		enableSorting: true,
		sortingFn: 'basic',
	}),
	columnHelper.accessor('points', {
		header: ({ column }) => <SortableHeader title="Баллы" column={column} />,
		cell: info => info.getValue(),
		enableSorting: true,
		sortingFn: 'basic',
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
