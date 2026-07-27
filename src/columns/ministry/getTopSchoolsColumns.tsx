import { createColumnHelper } from '@tanstack/react-table'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type { UniqueDistrictTopSchool } from '@/services/types/ministy.types'

const columnHelper = createColumnHelper<UniqueDistrictTopSchool>()

export const getTopSchoolsColumns = () => [
     columnHelper.accessor('name', {
        header: ({ column }) => <SortableHeader<UniqueDistrictTopSchool, string> title="Название" column={column} />,
        enableSorting: true,
        sortingFn: 'text',
        cell: info => (
            <span title={info.getValue()} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor('average_points', {
        header: ({ column }) => <SortableHeader<UniqueDistrictTopSchool, number> title="Ср. балл" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor('students_count', {
        header: ({ column }) => <SortableHeader<UniqueDistrictTopSchool, number> title="Кол-во учеников" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
     columnHelper.accessor('total_points', {
        header: ({ column }) => <SortableHeader<UniqueDistrictTopSchool, number> title="Баллы" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__value">
                {info.getValue()}
            </span>
        ),
    }),
]
