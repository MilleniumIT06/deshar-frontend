'use client'
import cn from 'classnames'
import Image from 'next/image'
import './styles.scss'

import type { User } from '@/entities/user/model/user.type'

interface AvatarProps {
	size?: 'small' | 'medium' | 'large'
	className?: string
	user?: User | null
	showName?: boolean
	onClick?: () => void
}

export const Avatar = ({ size = 'medium', className, user: propUser, showName = true, onClick }: AvatarProps) => {
	const currentUser = propUser
	const displayName = currentUser?.name || 'Пользователь'

	const sizeMap: Record<string, number> = {
		small: 32,
		medium: 44,
		large: 64,
	}

	const avatarSize = sizeMap[size]

	if (!propUser?.avatar) {
		return (
			<div
				className={cn('Avatar', className, { 'Avatar--clickable': onClick })}
				tabIndex={onClick ? 0 : undefined}
				data-testid="avatar"
				onClick={onClick}
				style={{ cursor: onClick ? 'pointer' : 'default' }}>
				{showName && displayName && displayName !== 'Пользователь' && (
					<span className="Avatar__name">{displayName}</span>
				)}
			</div>
		)
	}

	return (
		<div
			className={cn('Avatar', className, { 'Avatar--clickable': onClick })}
			tabIndex={onClick ? 0 : undefined}
			data-testid="avatar"
			onClick={onClick}
			style={{ cursor: onClick ? 'pointer' : 'default' }}>
			<div className={cn('Avatar__content', size)}>
				<Image
					src={propUser?.avatar}
					alt={`Аватар ${displayName}`}
					className="Avatar__image"
					width={avatarSize}
					height={avatarSize}
				/>
			</div>
			{showName && displayName && displayName !== 'Пользователь' && (
				<span className="Avatar__name">{displayName}</span>
			)}
		</div>
	)
}
