import { createColumnHelper } from '@tanstack/react-table'
import cn from 'classnames'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type { ISchoolAllStudents } from '@/services/admin/stats.service'


const columnHelper = createColumnHelper<ISchoolAllStudents>()

export const getSchoolBestStudentsColumns = () => [
    columnHelper.accessor('level', {
        header: ({ column }) => <SortableHeader title="Уровень" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => {

            return (
                <div className={cn('TableItem__value')}>
                    <span>{info.getValue()}</span>
                </div>
            )
        },
    }),
   columnHelper.accessor('class', {
        header: ({ column }) => <SortableHeader title="Класс" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => {

            return (
                <div className={cn('TableItem__value')}>
                    <span>{info.getValue()}</span>
                </div>
            )
        },
    }),
    columnHelper.accessor('name', {
        header: ({ column }) => <SortableHeader title="Имя" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => {

            return (
                <div className={cn('TableItem__value')}>
                    <span>{info.getValue()}</span>
                </div>
            )
        },
    }),
     columnHelper.accessor('completed_modules', {
        header: ({ column }) => <SortableHeader title="Выполнено модулей" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => {

            return (
                <div className={cn('TableItem__value')}>
                    <span>{info.getValue()}</span>
                </div>
            )
        },
    }),
     columnHelper.accessor('current_streak', {
        header: ({ column }) => <SortableHeader title="current_streak" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => {

            return (
                <div className={cn('TableItem__value')}>
                    <span>{info.getValue()}</span>
                </div>
            )
        },
    }),
]
