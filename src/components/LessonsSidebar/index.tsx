'use client'
import cn from 'classnames'
import { useCallback, useState } from 'react'

import { AttestationItem } from '@/components/AttestationItem'
import { LessonItem } from '@/components/LessonItem'
import { Button } from '@/shared/ui/Button'

import type { Id } from '@/shared/types/types'
import './styles.scss'

export const LessonsSidebar = ({ className,lessons,currentLessonId,handleLessonClick}: {
    handleLessonClick:(lesson:{id:Id;name:string;description:string;})=>void;
     className?: string;
     lessons:{id:Id;name:string;description:string;}[];
     currentLessonId:Id;
    }) => {
	const [page, setPage] = useState(0)
	const ITEMS_PER_PAGE = 6


	const handleNextPage = useCallback(() => {
		setPage(prev => prev + 1)
	}, [])

	const handlePrevPage = useCallback(() => {
		setPage(prev => prev - 1)
	}, [])

	const isActiveLessonItem = (lessonIndex:number) => {
		if(currentLessonId===lessonIndex)  {
			return true
		}
		return false
	}

	const isActiveAttestationItem = () => {
		return status === 'attestation'
	}

	const startIndex = page * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const paginatedLessons = lessons.slice(startIndex, endIndex)

	const hasPreviousPage = page > 0
	const hasNextPage = endIndex < lessons.length

	return (
		<div className={cn('LessonsSidebar', className)}>
			<div className="LessonsSidebar__inner">
				<div className="LessonsSidebar__wrapper">
					<h5 className="LessonsSidebar__title">Уроки</h5>
					<div className="LessonsSidebar__content">
						{hasPreviousPage && (
							<Button
								className="LessonsSidebar__showBtn"
								variant="secondary"
								size="medium"
								fullWidth
								onClick={handlePrevPage}>
								Показать предыдущие
							</Button>
						)}

						<ul className="LessonsSidebar__list">
							{paginatedLessons.map((lesson,index) => {
								// const lessonIndex = startIndex + index
								return (
									<LessonItem
										key={lesson.id}
										id={lesson.id}
										active={isActiveLessonItem(index)}
										completed={false}
										number={lesson.id}
										text={lesson.name}
										handleClick={() => handleLessonClick(lesson)}
										// disabled={isLessonDisabled(lessonIndex)}
									/>
								)
							})}
						</ul>

						{hasNextPage && (
							<Button
								className="LessonsSidebar__showBtn"
								variant="secondary"
								size="medium"
								fullWidth
								onClick={handleNextPage}>
								Показать следующие
							</Button>
						)}
					</div>
				</div>
				{/* <div className="LessonsSidebar__bottom">
					<h5 className="LessonsSidebar__title">Аттестация</h5>
					<AttestationItem
						max={lessons.length}
						current={0}
						active={isActiveAttestationItem()}
					/>
				</div> */}
			</div>
		</div>
	)
}
