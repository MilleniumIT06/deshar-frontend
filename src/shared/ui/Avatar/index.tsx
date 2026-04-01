'use client'

import { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { useAuth } from '@/shared/hooks/useAuth'
import './styles.scss'

interface User {
	id: number
	name: string
	email: string
	avatar?: string
}

interface AvatarProps {
	src?: string
	name?: string
	size?: 'small' | 'medium' | 'large'
	className?: string
	user?: User | null // Добавляем возможность передавать пользователя
	showName?: boolean // Опционально: показывать имя или нет
	onClick?: () => void // Добавляем обработчик клика
}

export const Avatar = ({
	src,
	name,
	size = 'medium',
	className,
	user: propUser,
	showName = true,
	onClick,
}: AvatarProps) => {
	const { user: hookUser } = useAuth()
	const [imageError, setImageError] = useState(false)

	// Используем переданного пользователя или из хука
	const currentUser = propUser || hookUser

	// Определяем имя для отображения
	const displayName = name || currentUser?.name || 'Пользователь'

	// Определяем src для аватара
	const avatarSrc = src || currentUser?.avatar || '/avatar.png'

	const getInitials = () => {
		if (!displayName || displayName === 'Пользователь') return 'U'
		const names = displayName.split(' ')
		return names
			.map(n => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2) // Максимум 2 буквы
	}

	const sizeMap: Record<string, number> = {
		small: 32,
		medium: 44,
		large: 64,
	}

	const avatarSize = sizeMap[size]

	return (
		<div
			className={cn('Avatar', className, { 'Avatar--clickable': onClick })}
			tabIndex={onClick ? 0 : undefined}
			data-testid="avatar"
			onClick={onClick}
			style={{ cursor: onClick ? 'pointer' : 'default' }}>
			<div className={cn('Avatar__content', size)}>
				{avatarSrc && !imageError ? (
					<Image
						src={avatarSrc}
						alt={`Аватар ${displayName}`}
						className="Avatar__image"
						width={avatarSize}
						height={avatarSize}
						onError={() => setImageError(true)}
					/>
				) : (
					<div className="Avatar__fallback">{getInitials()}</div>
				)}
			</div>

			{showName && displayName && displayName !== 'Пользователь' && (
				<span className="Avatar__name">{displayName}</span>
			)}
		</div>
	)
}
