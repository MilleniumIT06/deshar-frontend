import { createColumnHelper } from '@tanstack/react-table'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type { UniqueDistrictTopStudent } from '@/services/types/ministy.types'

type SchoolTopStudent = Omit<UniqueDistrictTopStudent,"school">
const columnHelper = createColumnHelper<SchoolTopStudent>()
export const getSchoolTopStudents = () => [
    columnHelper.accessor('level', {
        header: ({ column }) => <SortableHeader<SchoolTopStudent, number> title="Уровень" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
     columnHelper.accessor('name', {
        header: ({ column }) => <SortableHeader<SchoolTopStudent, string> title="Имя" column={column} />,
        enableSorting: true,
        sortingFn: 'text',
        cell: info => (
            <span title={info.getValue()} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
     columnHelper.accessor('points', {
        header: ({ column }) => <SortableHeader<SchoolTopStudent, number> title="Баллы" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
       columnHelper.accessor('class', {
        header: ({ column }) => <SortableHeader<SchoolTopStudent, string> title="Класс" column={column} />,
        enableSorting: true,
        sortingFn: 'text',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
]
