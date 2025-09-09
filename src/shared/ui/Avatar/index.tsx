import { useState } from 'react'

import Image from 'next/image'

import cn from 'classnames'

import './styles.scss'

interface AvatarProps {
	src?: string
	name?: string
	size?: 'small' | 'medium' | 'large'
	className?: string
}

export const Avatar = ({ src = '/avatar.png', name = 'Заур П.', size = 'medium', className }: AvatarProps) => {
	const [imageError, setImageError] = useState(false)

	const getInitials = () => {
		const names = name.split(' ')
		return names
			.map(n => n[0])
			.join('')
			.toUpperCase()
	}

	const sizeMap: Record<string, number> = {
		small: 32,
		medium: 44,
		large: 64,
	}

	const avatarSize = sizeMap[size]
	return (
		<div className={cn('Avatar', className)} tabIndex={6} data-testid="avatar">
			<div className={cn('Avatar__content', size)}>
				{src && !imageError ? (
					<Image
						src={src}
						alt={`Аватар ${name}`}
						className="Avatar__image"
						width={avatarSize}
						height={avatarSize}
						onError={() => setImageError(true)}
					/>
				) : (
					<div className="Avatar__fallback">{getInitials()}</div>
				)}
			</div>

			{name && <span className="Avatar__name">{name}</span>}
		</div>
	)
}
