import cn from 'classnames'

import { StarIconFilled, StarIcon } from '@/shared/ui'

import './styles.scss'

interface ReviewsCardProps {
	id: string | number
	name: string
	rating: number
	text: string
	subject: string
	className?: string
}

export const ReviewsCard = ({
	id,
	name = 'Зарина М.',
	rating = 3,
	text = 'Очень полезные курсы. Все нравится, особенно методика преподавания. Хочу также на другие курсы',
	subject = 'Ингушский язык, 7 класс',
	className,
}: ReviewsCardProps) => {
	const stars = Array.from({ length: 5 }, (_, index) => (
		<li key={`${id}-star-${index}`} className="ReviewsCard__slideStar">
			{index < rating ? <StarIconFilled /> : <StarIcon />}
		</li>
	))

	return (
		<div className={cn('ReviewsCard', className)}>
			<div className="ReviewsCard__header">
				<h6 className="ReviewsCard__name">{name}</h6>

				<ul className={cn('list-reset', 'ReviewsCard__stars')}>{stars}</ul>
			</div>

			<div className="ReviewsCard__body">
				<p>{text}</p>
			</div>

			<div className="ReviewsCard__footer">
				<span className="ReviewsCard__subject">{subject}</span>
			</div>
		</div>
	)
}
