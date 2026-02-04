'use client'
import { useState, useMemo } from 'react'

import { flexRender, type Row } from '@tanstack/react-table'

import useRole from '@/shared/hooks/admin/useRole'
import { type Role } from '@/shared/types/admin/auth'
import { type AttestationStatus } from '@/shared/types/admin/types'
import { Button } from '@/shared/ui/Button'
import './styles.scss'

interface StudentTableItemProps<TData> {
	row: Row<TData>
	status: AttestationStatus
}
const ROLE_TYPES: Role[] = ['vicePrincipal', 'department', 'ministry', 'admin']
const STATUS_CONFIG = {
	checking: {
		text: 'Аттестация ожидает принятия',
		className: 'attestationResults__status_text--notCompleted',
	},
	accepted: {
		text: 'Аттестация принята',
		className: 'attestationResults__status_text--accepted',
	},
	rejected: {
		text: 'Аттестация не принята',
		className: 'attestationResults__status_text--rejected',
	},
}
type AttestationResultsFooterStatus = Exclude<AttestationStatus, 'notCompleted'>

const ExpandIcon = ({ isExpanded }: { isExpanded: boolean }) => (
	<svg
		width="14"
		height="9"
		viewBox="0 0 14 9"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={isExpanded ? 'expanded' : ''}>
		<path d="M13 1L7 7L1 0.999999" stroke="#7D7979" strokeWidth="1.5" />
	</svg>
)

const ResultRow = ({
	task,
	time,
	mistakes,
	points,
}: {
	task: string
	time: string
	mistakes: string
	points: string
}) => (
	<tr className="attestationResults__tr">
		<td className="attestationResults__tr-task">{task}</td>
		<td className="attestationResults__tr-time">{time}</td>
		<td className="attestationResults__tr-mistakes">{mistakes}</td>
		<td className="attestationResults__tr-points">{points}</td>
	</tr>
)

const AttestationResultsTable = () => {
	const resultsData = useMemo(
		() =>
			Array.from({ length: 15 }, (_, index) => ({
				id: index + 1,
				task: '1',
				time: '0:21',
				mistakes: '0',
				points: '10',
			})),
		[],
	)

	return (
		<table className="StudentTableItem__attestationResults attestationResults">
			<thead className="attestationResults__head">
				<tr>
					<th className="attestationResults__head_th">Задание</th>
					<th className="attestationResults__head_th">Время (мм:сс)</th>
					<th className="attestationResults__head_th">Ошибки</th>
					<th className="attestationResults__head_th attestationResults__head_th--points">Баллы</th>
				</tr>
			</thead>
			<tbody>
				{resultsData.map(result => (
					<ResultRow
						key={result.id}
						task={result.task}
						time={result.time}
						mistakes={result.mistakes}
						points={result.points}
					/>
				))}
			</tbody>
		</table>
	)
}

const AttestationResultsHeader = () => {
	const { hasRole } = useRole()
	return (
		<div className="AttestationResultsHeader">
			<div className="AttestationResultsHeader__inner">
				<div className="AttestationResultsHeader__col">
					<div className="AttestationResultsHeader__item">
						<span className="AttestationResultsHeader__item_title">Ученик</span>
						<span className="AttestationResultsHeader__item_content">Евлоев Мурат</span>
					</div>
					<div className="AttestationResultsHeader__item">
						<span className="AttestationResultsHeader__item_title">Время аттестации</span>
						<time
							className="AttestationResultsHeader__item_content AttestationResultsHeader__item_content--time"
							dateTime="24.04.25 16:35">
							24.04.25 16:35
						</time>
					</div>
					{hasRole(['department', 'admin']) && (
						<div className="AttestationResultsHeader__item">
							<span className="AttestationResultsHeader__item_title">Модуль</span>
							<span className="AttestationResultsHeader__item_content">Произведения 20 века</span>
						</div>
					)}
				</div>
				<div className="AttestationResultsHeader__col">
					<div className="AttestationResultsHeader__item">
						<span className="AttestationResultsHeader__item_title">Класс</span>
						<span className="AttestationResultsHeader__item_content">{'5 "A"'}</span>
					</div>
					<div className="AttestationResultsHeader__item">
						<span className="AttestationResultsHeader__item_title">Ошибки</span>
						<span className="AttestationResultsHeader__item_content">4</span>
					</div>
					{hasRole(['department', 'admin']) && (
						<div className="AttestationResultsHeader__item">
							<span className="AttestationResultsHeader__item_title">Предмет</span>
							<span className="AttestationResultsHeader__item_content">Литература</span>
						</div>
					)}
				</div>
				<div className="AttestationResultsHeader__col">
					<div className="AttestationResultsHeader__item">
						<span className="AttestationResultsHeader__item_title">Учитель</span>
						<span className="AttestationResultsHeader__item_content">Инаркиева Зарема</span>
					</div>
					<div className="AttestationResultsHeader__item">
						<span className="AttestationResultsHeader__item_title">Общий балл</span>
						<span className="AttestationResultsHeader__item_content">96</span>
					</div>
				</div>
			</div>
		</div>
	)
}
const AttestationResultsFooter = ({ status }: { status: AttestationResultsFooterStatus }) => {
	const { hasRole } = useRole()
	const canManageAttestation = hasRole(ROLE_TYPES)

	const statusConfig = STATUS_CONFIG[status]
	const isStatusWithDetails = status === 'accepted' || status === 'rejected'

	if (!statusConfig) {
		return <>Error</>
	}

	return (
		<>
			<div className="attestationResults__status_wrapper">
				<span className={`attestationResults__status_text ${statusConfig.className}`}>
					{statusConfig.text}
				</span>
				{isStatusWithDetails && (
					<span className={`attestationResults__status_text ${statusConfig.className}`}>
						12.04.2025, 17:30 - Альтиева Роза, завуч
					</span>
				)}
			</div>

			{canManageAttestation && (
				<div className="attestationResults__controls">
					{status === 'checking' ? (
						<>
							<Button className="attestationResults__reject" variant="secondary" size="small">
								Отклонить
							</Button>
							<Button className="attestationResults__accept" variant="primary" size="small">
								Принять
							</Button>
						</>
					) : (
						<Button className="attestationResults__reset" variant="secondary" size="small">
							Сбросить решение
						</Button>
					)}
				</div>
			)}
		</>
	)
}

export const StudentTableItem = <TData,>({ row, status }: StudentTableItemProps<TData>) => {
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleExpanded = () => setIsExpanded(prev => !prev)
	const { hasRole } = useRole()
	const renderExpandedContent = () => {
		if (status === 'notCompleted') {
			return (
				<tr>
					<td colSpan={8}>
						<div className="attestationResults__wrapper attestationResults__wrapper--noData">
							<span>Аттестация еще не пройдена</span>
						</div>
					</td>
				</tr>
			)
		}

		return (
			<tr>
				<td colSpan={8}>
					<div className="attestationResults__wrapper">
						{hasRole(['vicePrincipal', 'department', 'admin']) && <AttestationResultsHeader />}
						<div className="attestationResults__container">
							<AttestationResultsTable />
						</div>
						<div className="attestationResults__footer">
							<AttestationResultsFooter status={status} />
						</div>
					</div>
				</td>
			</tr>
		)
	}

	return (
		<>
			<tr className="StudentTableItem">
				{row.getVisibleCells().map(cell => (
					<td key={cell.id} className={`StudentTableItem__${cell.column.id}`}>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</td>
				))}
				<td className="StudentTableItem__btn">
					<button
						className={`btn-reset StudentTableItem__btn_more ${isExpanded ? 'active' : ''}`}
						onClick={toggleExpanded}
						aria-expanded={isExpanded}>
						<ExpandIcon isExpanded={isExpanded} />
					</button>
				</td>
			</tr>
			{isExpanded && renderExpandedContent()}
		</>
	)
}
