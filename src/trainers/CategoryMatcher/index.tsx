/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames'
import { useImperativeHandle, forwardRef, useRef, useEffect } from 'react'
import { ArcherContainer, ArcherElement } from 'react-archer'

import { useCheckAnswer } from '@/hooks/trainers/useCheckAnswer'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { useCategoryMatcher } from './useCategoryMatcher'
import './styles.scss'

import type { Id } from '@/shared/types/types'
import type { TrainerCommonProps } from '@/widgets/trainers-engine/types/types'

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

interface CategoryMatcherProps extends TrainerCommonProps {
	payload: {
		items: CategoryMatcherItem[]
		categories: Category[]
	}
}

export const CategoryMatcher = forwardRef(
	({ payload, onSuccess, onError, changeStatus, title, subTitle, currentTrainerIndex, audio }: CategoryMatcherProps, ref) => {
		const { items, categories } = payload
		const archerRef = useRef<any>(null)

		const { connections, activeSource, startConnection, endConnection, mousePos, resetConnections } = useCategoryMatcher()
		const { checkAnswer } = useCheckAnswer({
			onSuccess: () => changeStatus('success'),
			onError: () => changeStatus('error'),
		})
		useImperativeHandle(ref, () => ({
			handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
				const allConnected = items.every(item => connections.some(conn => conn.source === item.id))
				if (!allConnected) return

				if (!moduleId || !pieceId || !lessonId || !taskId) return

				const isCorrectClient = items.every(item => {
					const conn = connections.find(c => c.source === item.id)
					return conn?.target === item.correct
				})
				changeStatus(isCorrectClient ? 'success' : 'error')

				const formattedAnswers = items.map(item => {
					const conn = connections.find(c => c.source === item.id)
					return {
						[item.id]: conn ? conn.target : null,
					}
				})

				const data = await checkAnswer({
					moduleId,
					pieceId,
					lessonId,
					taskId,
					answer: formattedAnswers,
					timeSpent: timeSpent ?? 0,
				})

				if (data?.is_correct || (data?.is_completed && isCorrectClient)) {
					onSuccess()
				} else {
					onError()
				}
				if (isCorrectClient !== data?.is_correct) {
					// eslint-disable-next-line no-console
					console.warn('Client/server mismatch on answer check', {
						taskId,
						isCorrectClient,
						serverResult: data?.is_correct,
					})
				}
			},
			handleReset: () => {
				changeStatus('idle')
				resetConnections()
			},
		}))
		useEffect(() => {
			if (activeSource && archerRef.current) {
				archerRef.current.refreshScreen()
			}
		}, [mousePos, activeSource])
		const onStartConnect = (e: React.MouseEvent, id: string) => {
			changeStatus('idle')
			startConnection(id, e)
		}
		const onEndConnect = (targetId: string) => {
			changeStatus('idle')
			endConnection(targetId)
		}
		return (
			<div className="category-matcher">
				<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
				{title && <TrainerTitle title={title} audio={audio} />}
				{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
				<ArcherContainer ref={archerRef} strokeColor="#4f46e5" strokeWidth={3} endShape={{ arrow: { arrowLength: 0 } }}>
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
											className={cn('category-matcher__card category-matcher__card--source', {
												'category-matcher__card--active': isDragging || conn,
												'category-matcher__card--clickable': !conn,
												'is-active': isDragging,
												'is-connected': Boolean(conn),
											})}
											style={
												{
													'--dot-color': isDragging ? '#4f46e5' : w.color,
													'--tw-ring-color': isDragging ? '#4f46e5' : w.color,
												} as React.CSSProperties
											}
											onClick={e => onStartConnect(e, w.id)}>
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
											onClick={() => onEndConnect(c.id)}
											className={cn('category-matcher__card category-matcher__card--target', {
												'category-matcher__card--active': isTargeted,
												'is-targeted': isTargeted,
												'can-receive': Boolean(activeSource),
												'category-matcher__card--clickable': Boolean(activeSource),
											})}
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
									width: 1, // Небольшой размер, чтобы Archer мог зацепиться
									height: 1,
									pointerEvents: 'none',
								}}
							/>
						</ArcherElement>
					)}
					{/* <ArcherElement id="mouse-pointer">
    <div
        style={{
            position: 'fixed',
            left: mousePos.x,
            top: mousePos.y,
            width: 1, // Небольшой размер, чтобы Archer мог зацепиться
            height: 1,
            pointerEvents: 'none',
            visibility: activeSource ? 'visible' : 'hidden' // Скрываем, когда нет тяги
        }}
    />
</ArcherElement> */}
				</ArcherContainer>
			</div>
		)
	},
)

CategoryMatcher.displayName = 'CategoryMatcher'
