import { useDraggable } from '@dnd-kit/core'
import cn from 'classnames'

import './variant.scss'

interface VariantProps {
	id: number | string
	value: string
	isDisabled: boolean
}

export const Variant = ({ isDisabled, value, id }: VariantProps) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id,
		data: { value },
		disabled: isDisabled,
	})

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn('variant', {
				'is-disabled': isDisabled,
				'is-dragging': isDragging,
			})}
			{...listeners}
			{...attributes}>
			<button className="variant__icon-button">
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_126_6043)">
						<path
							d="M6.88686 11.2552C6.88686 11.5023 6.74824 11.7268 6.5313 11.8316C6.44743 11.8724 6.35755 11.8922 6.26826 11.8922C6.12685 11.8922 5.98676 11.8421 5.87361 11.7455L2.49249 8.85992H0.691704C0.350196 8.86022 0.0732422 8.57483 0.0732422 8.2231V5.68532C0.0732422 5.33345 0.350196 5.0482 0.691704 5.0482H2.49264L5.87376 2.16262C6.05849 2.00492 6.31466 1.97131 6.53145 2.07684C6.74824 2.18162 6.88701 2.40625 6.88701 2.6532L6.88686 11.2552ZM9.26366 10.2599C9.24858 10.2609 9.23409 10.2615 9.21916 10.2615C9.0558 10.2615 8.89829 10.1951 8.78192 10.0751L8.69921 9.98957C8.48228 9.7666 8.45681 9.41336 8.63949 9.15978C9.10264 8.51663 9.3471 7.75423 9.3471 6.95444C9.3471 6.09419 9.06956 5.28731 8.54434 4.62094C8.34439 4.36766 8.36283 3.99981 8.58694 3.76914L8.6695 3.68396C8.79305 3.55672 8.9586 3.48737 9.13777 3.49837C9.31226 3.50742 9.47518 3.592 9.58585 3.7313C10.3144 4.64944 10.6992 5.76417 10.6992 6.95459C10.6992 8.06329 10.3589 9.11862 9.71481 10.006C9.60722 10.1539 9.44269 10.2468 9.26366 10.2599ZM11.8207 12.2284C11.7088 12.3645 11.5471 12.4462 11.3739 12.4538C11.3654 12.4541 11.3568 12.4544 11.348 12.4544C11.1842 12.4544 11.027 12.3877 10.9106 12.2679L10.8294 12.1842C10.6023 11.9505 10.587 11.5768 10.7933 11.3238C11.7908 10.102 12.3403 8.5504 12.3403 6.95444C12.3403 5.2944 11.752 3.69632 10.6841 2.45465C10.4677 2.20257 10.4786 1.821 10.709 1.58279L10.7901 1.49912C10.9105 1.37459 11.0668 1.30599 11.2461 1.31187C11.4163 1.31685 11.5774 1.39434 11.6905 1.5255C12.9813 3.02227 13.6923 4.95051 13.6923 6.95444C13.6926 8.88253 13.0279 10.7556 11.8207 12.2284Z"
							fill="white"
						/>
					</g>
					<defs>
						<clipPath id="clip0_126_6043">
							<rect width="13.7647" height="13.7647" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</button>

			<span className="variant__text">{value}</span>
		</div>
	)
}
