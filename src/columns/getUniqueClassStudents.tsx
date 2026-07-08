import { createColumnHelper } from '@tanstack/react-table'
import cn from 'classnames'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type { Id } from '@/shared/types/types'

const columnHelper = createColumnHelper<{id:Id;level:number;level_name:string;name:string;rank:number;xp:0}>()

export const getUniqueClassStudentsColumns = () => [
    columnHelper.accessor('level', {
        header: ({ column }) => <SortableHeader title="Уровень" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => {
            return (
                <div className={cn('TableItem__place')}>
                    <span>{info.getValue()}</span>
                </div>
            )
        },
    }),
    columnHelper.accessor('name', {
        header: ({ column }) => <SortableHeader title="Имя" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={info.getValue()} className="TableItem__name">
                {info.getValue()}
            </span>
        ),
    }),

    columnHelper.accessor('level_name', {
        header: ({ column }) => <SortableHeader title="level_name" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__name">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor('rank', {
        header: ({ column }) => <SortableHeader title="Rank" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__name">
                {info.getValue()}
            </span>
        ),
    }),
     columnHelper.accessor('xp', {
        header: ({ column }) => <SortableHeader title="Баллы" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__name">
                {info.getValue()}
            </span>
        ),
    }),
]
