import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@/app/_store/hooks'
import { logoutAction } from '@/entities/user/model/user.slice'
import { loginService } from '@/services/auth/login.service'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'

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
	const router = useRouter()
	const dispatch = useAppDispatch()
	const handleLogout = async () => {
		try {
			await loginService.logout()
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Ошибка при логауте:', error)
		} finally {
			dispatch(logoutAction())
			handleMenuClose(false)
			router.push('/sign-in')
		}
	}
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
						<Link href={item.itemHref} className="UserMenu__item" onClick={() => handleMenuClose(false)}>
							{item.itemTitle}
						</Link>
					))}
				<div className="UserMenu__divider" />
				<Button variant={'primary'} size="small" onClick={handleLogout} className="UserMenu__logout_btn">
					Выйти
				</Button>
			</div>
		</div>
	)
}
