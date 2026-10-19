import cn from 'classnames'
import Link from 'next/link'

import { LogoutButton } from '@/features/auth/LogoutButton'
import { Avatar } from '@/shared/ui/Avatar'

import type { UserProfileResponse } from '@/shared/types/user.types'

import './styles.scss'

export const UserMenu = ({
	handleMenuClose,
	profileData,
	extraClass,
	listItems,
}: {
	handleMenuClose: (value: boolean) => void
	profileData: UserProfileResponse
	extraClass?: string
	listItems?: { itemHref: string; itemTitle: string }[]
}) => {
	return (
		<div className={cn('UserMenu', extraClass)}>
			<div className="UserMenu__header">
				<Avatar user={profileData.data.user} size="small" showName={false} />
				<div className="UserMenu__info">
					<div className="UserMenu__name">{profileData.data.user.name || 'Пользователь'}</div>
					<div className="UserMenu__email">{profileData.data.user.email || ''}</div>
				</div>
			</div>
			<div className="UserMenu__divider" />
			<div className="UserMenu__list">
				{listItems &&
					listItems.length > 0 &&
					listItems.map(item => (
						<Link key={item.itemTitle} href={item.itemHref} className="UserMenu__item" onClick={() => handleMenuClose(false)}>
							{item.itemTitle}
						</Link>
					))}
				<div className="UserMenu__divider" />
				<LogoutButton />
			</div>
		</div>
	)
}
