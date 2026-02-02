'use client'

import { useState, useEffect } from 'react'

import cn from 'classnames'

import './styles.scss'
import { ROLE_LABELS } from '@/shared/admin/utils'
import { type Role } from '@/shared/types/admin/auth'

interface AvatarProps {
	src?: string
	name?: string
	size?: 'small' | 'medium' | 'large'
	className?: string
	role?: Role
	onClick?: () => void
}

export const Avatar = ({
	src = '/avatar.png',
	name = 'Ислам Парчиев',
	size = 'medium',
	className,
	role = 'admin',
	onClick,
}: AvatarProps) => {
	const [imageError, setImageError] = useState(false)

	useEffect(() => {
		setImageError(false)
	}, [src])

	const getInitials = () => {
		if (!name.trim()) return '?'

		const names = name.split(' ').filter(Boolean)
		return names
			.slice(0, 2)
			.map(n => n[0])
			.join('')
			.toUpperCase()
	}

	const sizeMap = {
		small: 32,
		medium: 44,
		large: 64,
	} as const

	const avatarSize = sizeMap[size]

	return (
		<div
			className={cn('Avatar', className, { 'Avatar--clickable': onClick })}
			tabIndex={onClick ? 0 : -1}
			data-testid="avatar"
			onClick={onClick}
			role={onClick ? 'button' : undefined}>
			<div className={cn('Avatar__content', `Avatar__content--${size}`)}>
				{src && !imageError ? (
					// <img
					//     src={src}
					//     alt={`Аватар ${name}`}
					//     className="Avatar__image"
					//     width={avatarSize}
					//     height={avatarSize}
					//     onError={() => setImageError(true)}
					//     loading="lazy"
					// />
					<div>test</div>
				) : (
					<div className="Avatar__fallback" style={{ width: avatarSize, height: avatarSize }}>
						{getInitials()}
					</div>
				)}
			</div>
			<div className="Avatar__info">
				{name && <span className="Avatar__name">{name}</span>}
				{role && <span className="Avatar__role">{ROLE_LABELS[role]}</span>}
			</div>
		</div>
	)
}
