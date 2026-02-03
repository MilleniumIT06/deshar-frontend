/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react'

import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	getSortedRowModel,
	type SortingState,
	type AccessorKeyColumnDefBase,
	type IdIdentifier,
} from '@tanstack/react-table'
import './styles.scss'

interface TableProps<TableItemType, T> {
	data: TableItemType[]
	getColumns: () => (AccessorKeyColumnDefBase<TableItemType, T> & Partial<IdIdentifier<TableItemType, T>>)[]
	handleRowClick?: (item: TableItemType) => void
}
export const Table = <TData, TValue>({ data, getColumns, handleRowClick }: TableProps<TData, TValue>) => {
	const columns = useMemo(() => getColumns(), [])
	// Состояние для сортировки
	const [sorting, setSorting] = useState<SortingState>([])

	const table = useReactTable({
		data: data,
		columns,
		state: {
			sorting, // Передаем состояние сортировки
		},
		onSortingChange: setSorting, // Функция для обновления сортировки
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(), // Модель для сортировки
	})
	return (
		<div className="Table__scroll-container">
			<table className="Table">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id} className="Table__tr">
							{headerGroup.headers.map(header => (
								<th key={header.id} className="Table__th" colSpan={header.colSpan}>
									{header.isPlaceholder ? null : (
										<div
											{...{
												className: header.column.getCanSort()
													? 'cursor-pointer select-none'
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
																stroke-width="1.5"
															/>
															<path
																d="M10 15L10 5"
																stroke="#7D7979"
																stroke-width="1.4"
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
															stroke-width="1.5"
														/>
														<path
															d="M10 15L10 5"
															stroke="#7D7979"
															stroke-width="1.4"
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
						<tr key={row.id} className={`TableItem`} onClick={() => handleRowClick?.(row.original)}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
