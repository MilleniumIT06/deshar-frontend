'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useAppDispatch } from '@/app/_store/hooks'
import { logoutAction } from '@/entities/user/model/user.slice'
import { loginService } from '@/services/auth/login.service'
import { Button } from '@/shared/ui/Button'
import './styles.scss'

export const LogoutButton = ({ onLogoutSuccess }: { onLogoutSuccess?: () => void }) => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const handleLogout = async () => {
		try {
			await loginService.logout()
			dispatch(logoutAction())
			onLogoutSuccess?.()
			toast.success('Вы успешно вышли из аккаунта!')
			router.replace('/sign-in')
		} catch (error) {
			console.error('Ошибка при логауте:', error)
			toast.error('Ошибка при выходе из аккаунта!')
		}
	}

	return (
		<Button variant="primary" size="small" onClick={handleLogout} className="UserMenuLogoutBtn">
			Выйти
		</Button>
	)
}
