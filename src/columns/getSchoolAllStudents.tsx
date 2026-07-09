import { createColumnHelper } from '@tanstack/react-table'

import { SortableHeader } from '@/components/Admin/SortableHeader'

import type { StudentCommonData } from '@/shared/types/admin/types'
import type{ Id } from '@/shared/types/types'

interface ColumnData extends StudentCommonData {
progress_percentage:number;
avatar:string;
class:string;
class_id:Id;
completed_modules:number;
current_streak:number;
email:string;
is_online:boolean;
}

const columnHelper = createColumnHelper<ColumnData>()

export const getSchoolAllStudents = () => [
     columnHelper.accessor('name', {
        header: ({ column }) => <SortableHeader<ColumnData, string> title="Имя" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={info.getValue()} className="TableItem__name">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor('class', {
        header: ({ column }) => <SortableHeader<ColumnData, string> title="Класс" column={column} />,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        cell: info => (
            <span title={info.getValue()} className="TableItem__name">
                {info.getValue()}
            </span>
        ),
    }),

    columnHelper.accessor('completed_modules', {
        header: ({ column }) => <SortableHeader title="Выполненно модулей" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__modules">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor('current_streak', {
        header: ({ column }) => <SortableHeader title="current_streak" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__modules">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor('xp', {
        header: ({ column }) => <SortableHeader title="Баллы" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__points">
                {info.getValue()}
            </span>
        ),
    }),
     columnHelper.accessor('progress_percentage', {
        header: ({ column }) => <SortableHeader title="Процент прогресса" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__points">
                {info.getValue()}
            </span>
        ),
    }),
     columnHelper.accessor('level', {
        header: ({ column }) => <SortableHeader title="Уровень" column={column} />,
        enableSorting: true,
        sortingFn: 'basic',
        cell: info => (
            <span title={String(info.getValue())} className="TableItem__name">
                {info.getValue()}
            </span>
        ),
    }),
]
