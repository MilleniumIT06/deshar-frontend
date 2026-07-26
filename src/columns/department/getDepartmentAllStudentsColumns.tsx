import { createColumnHelper } from '@tanstack/react-table'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type { IDepartmentStudent } from '@/services/types/department.types'


const columnHelper = createColumnHelper<IDepartmentStudent>()
export const getDepartmentAllStudentsColumns = () => [
    columnHelper.accessor('level', {
        header: ({ column }) => <SortableHeader<IDepartmentStudent, number> title="Уровень" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
     columnHelper.accessor('name', {
        header: ({ column }) => <SortableHeader<IDepartmentStudent, string> title="Имя" column={column} />,
        enableSorting: true,
        sortingFn: 'text',
        cell: info => (
            <span title={info.getValue()} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
     columnHelper.accessor('points', {
        header: ({ column }) => <SortableHeader<IDepartmentStudent, number> title="Баллы" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
       columnHelper.accessor('class', {
        header: ({ column }) => <SortableHeader<IDepartmentStudent, string> title="Класс" column={column} />,
        enableSorting: true,
        sortingFn: 'text',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
       columnHelper.accessor('email', {
        header: ({ column }) => <SortableHeader<IDepartmentStudent, string> title="E-mail" column={column} />,
        enableSorting: true,
        sortingFn: 'text',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
       columnHelper.accessor('school', {
        header: ({ column }) => <SortableHeader<IDepartmentStudent, string> title="Школа" column={column} />,
        enableSorting: true,
        sortingFn: 'text',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
     columnHelper.accessor('tasks_completed', {
        header: ({ column }) => <SortableHeader<IDepartmentStudent, number> title="Выполнено заданий" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
]
