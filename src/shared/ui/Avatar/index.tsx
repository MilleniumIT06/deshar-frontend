'use client'

import { useState, useMemo } from 'react'
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
	user?: User | null
	showName?: boolean
	onClick?: () => void
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

	const currentUser = propUser || hookUser
	const displayName = name || currentUser?.name || 'Пользователь'

	// Функция для валидации и форматирования URL аватара
	const getValidAvatarUrl = (avatarUrl?: string) => {
		if (!avatarUrl) return null

		// Если это уже полный URL
		if (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://')) {
			return avatarUrl
		}

		// Если это data URL
		if (avatarUrl.startsWith('data:')) {
			return avatarUrl
		}

		// Если это относительный путь, добавляем base URL
		if (avatarUrl.startsWith('/')) {
			const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'
			return `${baseUrl}${avatarUrl}`
		}

		// Для других случаев (например, просто имя файла)
		const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'
		return `${baseUrl}/storage/${avatarUrl}`
	}

	const avatarSrc = useMemo(() => {
		const rawSrc = src || currentUser?.avatar || '/avatar.png'
		return getValidAvatarUrl(rawSrc)
	}, [src, currentUser?.avatar])

	const getInitials = () => {
		if (!displayName || displayName === 'Пользователь') return 'U'
		const names = displayName.split(' ')
		return names
			.map(n => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	}

	const sizeMap: Record<string, number> = {
		small: 32,
		medium: 44,
		large: 64,
	}

	const avatarSize = sizeMap[size]

	// Если нет валидного URL или есть ошибка, показываем fallback
	if (!avatarSrc || imageError) {
		return (
			<div
				className={cn('Avatar', className, { 'Avatar--clickable': onClick })}
				tabIndex={onClick ? 0 : undefined}
				data-testid="avatar"
				onClick={onClick}
				style={{ cursor: onClick ? 'pointer' : 'default' }}>
				<div className={cn('Avatar__content', size)}>
					<div className="Avatar__fallback">{getInitials()}</div>
				</div>
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
					src={avatarSrc}
					alt={`Аватар ${displayName}`}
					className="Avatar__image"
					width={avatarSize}
					height={avatarSize}
					onError={() => setImageError(true)}
				/>
			</div>
			{showName && displayName && displayName !== 'Пользователь' && (
				<span className="Avatar__name">{displayName}</span>
			)}
		</div>
	)
}
