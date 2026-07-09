import { createColumnHelper } from '@tanstack/react-table'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type { Id } from '@/shared/types/types';

const columnHelper = createColumnHelper<{
			id:Id;
			name: string;
			email: string;
			avatar: string;
			is_online: boolean;
			last_activity: string;
			students_count: number;
			classes_count: number;
		}>()


export const getTeacherColumns = () => [
	// columnHelper.accessor('avatar', {
	// 	header: ({ column }) => <SortableHeader title="Аватарка" column={column} />,
	// 	enableSorting: true,
	// 	sortingFn: 'basic',
	// 	cell: info => {
	// 		return (
	// 			// <div className={'TableItem__name'}>
	// 			// 	<span>{info.getValue()}</span>
	// 			// </div>
	// 			<Avatar
	// 			size='small'
	// 			src={info.getValue()}/>
	// 		)
	// 	},
	// }),
	columnHelper.accessor('name', {
		header: ({ column }) => <SortableHeader title="Имя" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => {
			return (
				<div className={'TableItem__name'}>
					<span>{info.getValue()}</span>
				</div>
			)
		},
	}),
columnHelper.accessor('email', {
		header: ({ column }) => <SortableHeader title="E-mail" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => {
			return (
				<div className={'TableItem__name'}>
					<span>{info.getValue()}</span>
				</div>
			)
		},
	}),
	columnHelper.accessor('classes_count', {
		header: ({ column }) => <SortableHeader title="Кол-во классов" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => {
			return (
				<div className={'TableItem__name'}>
					<span>{info.getValue()}</span>
				</div>
			)
		},
	}),
	columnHelper.accessor('is_online', {
		header: ({ column }) => <SortableHeader title="Статус" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => {
			return (
				<div className={'TableItem__name'}>
					<span>{info.getValue() ? "В сети": "Оффлайн"}</span>
				</div>
			)
		},
	}),
	columnHelper.accessor('students_count', {
		header: ({ column }) => <SortableHeader title="Кол-во учеников" column={column} />,
		enableSorting: true,
		sortingFn: 'basic',
		cell: info => {
			return (
				<div className={'TableItem__name'}>
					<span>{info.getValue()}</span>
				</div>
			)
		},
	}),
]
