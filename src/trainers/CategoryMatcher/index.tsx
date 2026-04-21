/* eslint-disable @typescript-eslint/no-explicit-any */
import { useImperativeHandle, forwardRef } from 'react'
import { ArcherContainer, ArcherElement } from 'react-archer'
import { useCategoryMatcher } from './useCategoryMatcher'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import cn from 'classnames'

export interface CategoryMatcherItem {
	id: string
	label: string
	correct: string
	color: string
}

export interface Category {
	id: string
	label: string
	color: string
}

interface CategoryMatcherProps {
	title?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	payload: {
		items: CategoryMatcherItem[]
		categories: Category[]
	}
}

export const CategoryMatcher = forwardRef(
	({ payload, onSuccess, onError, changeStatus, title }: CategoryMatcherProps, ref) => {
		const { items, categories } = payload

		const { connections, activeSource, startConnection, endConnection, mousePos, resetConnections } =
			useCategoryMatcher()

		useImperativeHandle(ref, () => ({
			handleCheck: () => {
				const allConnected = items.every(item => connections.some(conn => conn.source === item.id))

				if (!allConnected) return

				const isCorrect = items.every(item => {
					const conn = connections.find(c => c.source === item.id)
					return conn?.target === item.correct
				})

				if (isCorrect) {
					changeStatus('success')
					onSuccess()
				} else {
					changeStatus('error')
					onError()
				}
			},
			handleReset: () => {
				changeStatus('idle')
				resetConnections()
			},
		}))

		const onStartConnect = (id: string) => {
			changeStatus('idle')
			startConnection(id)
		}

		return (
			<div className="category-matcher">
				{title && <TrainerTitle title={title} />}
				<ArcherContainer strokeColor="#4f46e5" strokeWidth={3} endShape={{ arrow: { arrowLength: 0 } }}>
					<div className="category-matcher__container">
						{/* Левая колонка (Items) */}
						<div className="category-matcher__column">
							{items.map(w => {
								const conn = connections.find(c => c.source === w.id)
								const isDragging = activeSource === w.id
								const relations = conn
									? [
											{
												targetId: conn.target,
												targetAnchor: 'left',
												sourceAnchor: 'right',
												style: { strokeColor: w.color, lineStyle: 'straight' },
											},
										]
									: isDragging
										? [
												{
													targetId: 'mouse-pointer',
													targetAnchor: 'left',
													sourceAnchor: 'right',
													style: {
														strokeColor: '#4f46e5',
														lineStyle: 'straight',
													},
												},
											]
										: []

								return (
									<ArcherElement key={w.id} id={w.id} relations={relations as any}>
										<div
											className={cn(
												'category-matcher__card category-matcher__card--source',
												{
													'category-matcher__card--active': isDragging || conn,
													'category-matcher__card--clickable': !conn,
													'is-active': isDragging,
													'is-connected': Boolean(conn),
												},
											)}
											style={
												{
													'--dot-color': isDragging ? '#4f46e5' : w.color,
													'--tw-ring-color': isDragging ? '#4f46e5' : w.color,
												} as React.CSSProperties
											}
											onClick={() => onStartConnect(w.id)}>
											<span>{w.label}</span>
										</div>
									</ArcherElement>
								)
							})}
						</div>

						{/* Правая колонка (Categories) */}
						<div className="category-matcher__column">
							{categories.map(c => {
								const isTargeted = connections.some(conn => conn.target === c.id)

								return (
									<ArcherElement key={c.id} id={c.id}>
										<div
											onClick={() => endConnection(c.id)}
											className={cn(
												'category-matcher__card category-matcher__card--target',
												{
													'category-matcher__card--active': isTargeted,
													'is-targeted': isTargeted,
													'can-receive': Boolean(activeSource),
													'category-matcher__card--clickable':
														Boolean(activeSource),
												},
											)}
											style={
												{
													'--dot-color': c.color,
													'--tw-ring-color': c.color,
												} as React.CSSProperties
											}>
											<span>{c.label}</span>
										</div>
									</ArcherElement>
								)
							})}
						</div>
					</div>
					{activeSource && (
						<ArcherElement id="mouse-pointer">
							<div
								style={{
									position: 'fixed',
									left: mousePos.x,
									top: mousePos.y,
									pointerEvents: 'none',
								}}
							/>
						</ArcherElement>
					)}
				</ArcherContainer>
			</div>
		)
	},
)

CategoryMatcher.displayName = 'CategoryMatcher'
