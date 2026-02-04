'use client'

import { useMemo, useState } from 'react'

import { useReactTable, getCoreRowModel, flexRender, type SortingState, getSortedRowModel } from '@tanstack/react-table'

import './styles.scss'
import { getStudentTableColumns } from '@/columns/getStudentTableColumns'
import { type AttestationStatus } from '@/shared/types/admin/types'

import { StudentTableItem } from '../StudentTableItem'

export type StudentTableItemType = {
	id: number
	module: string
	doneLessons: number
	maxLessons: number
	processLessons: number
	learningTime: string
	mistakes: number
	points: number
	attestationStatus: AttestationStatus
}

export const StudentTable = ({ data }: { data: StudentTableItemType[] }) => {
	const columns = useMemo(() => getStudentTableColumns(), [])
	const [tableData] = useState(data)
	const [sorting, setSorting] = useState<SortingState>([])
	// Initialize the table
	const table = useReactTable({
		data: tableData,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<div className="Table__scroll-container">
			<table className="Table">
				<thead className="Table__head">
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id} className="Table__tr">
							{headerGroup.headers.map(header => (
								<th key={header.id} className={`Table__th Table__head_${header.id}`}>
									{header.isPlaceholder ? null : (
										<div
											{...{
												className: header.column.getCanSort()
													? 'cursor-pointer select-none Table__head_inner'
													: '',
												onClick: header.column.getToggleSortingHandler(),
											}}>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{{
												asc: (
													<svg
														width="20"
														height="20"
														viewBox="0 0 20 20"
														fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<g transform="rotate(180 10 10)">
															<path
																d="M15 10L10 15L5 10"
																stroke="#7D7979"
																strokeWidth="1.5"
															/>
															<path
																d="M10 15L10 5"
																stroke="#7D7979"
																strokeWidth="1.4"
															/>
														</g>
													</svg>
												),
												desc: (
													<svg
														width="20"
														height="20"
														viewBox="0 0 20 20"
														fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<path
															d="M15 10L10 15L5 10"
															stroke="#7D7979"
															strokeWidth="1.5"
														/>
														<path
															d="M10 15L10 5"
															stroke="#7D7979"
															strokeWidth="1.4"
														/>
													</svg>
												),
											}[header.column.getIsSorted() as string] ?? null}
										</div>
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<StudentTableItem<StudentTableItemType>
							key={row.id}
							row={row}
							status={row.original.attestationStatus}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}
