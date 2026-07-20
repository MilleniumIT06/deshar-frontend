import { createColumnHelper } from '@tanstack/react-table'
// import cn from 'classnames'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type  { ManagerTopStudent } from '@/services/types/republic.types'

const columnHelper = createColumnHelper<ManagerTopStudent>()


export const getBestStudentsColumns = () => [
    // columnHelper.accessor('placeNumber', {
    //     header: ({ column }) => <SortableHeader title="Место" column={column} />,
    //     enableSorting: true,
    //     sortingFn: 'basic',
    //     cell: info => {
    //         const placeNumber = info.getValue()
    //         const placeClasses = {
    //             1: 'TableItem__place_first',
    //             2: 'TableItem__place_second',
    //             3: 'TableItem__place_third',
    //         }
    //         const placeClass = placeClasses[placeNumber as keyof typeof placeClasses] || 'TableItem__place_other'

    //         return (
    //             <div className={cn('TableItem__place', placeClass)}>
    //                 <span>{placeNumber}</span>
    //             </div>
    //         )
    //     },
    // }),
    columnHelper.accessor('level', {
        header: ({ column }) => <SortableHeader title="Уровень" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor('name', {
        header: ({ column }) => <SortableHeader<ManagerTopStudent, string> title="Ученик" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={info.getValue()} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),

    columnHelper.accessor('points', {
        header: ({ column }) => <SortableHeader title="Баллы" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor('class', {
        header: ({ column }) => <SortableHeader title="Класс" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor('school', {
        header: ({ column }) => <SortableHeader title="Школа" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
]
