import { userService } from '@/services/user.service'

import { useQuery } from '@tanstack/react-query'

interface ProfileResponse {
	success: boolean
	user: {
		avatar: string
		current_streak: number
		email: string
		id: number
		is_active: boolean
		is_banned: boolean
		last_activity_at: '2026-06-29T12:38:58.000000Z'
		level: number
		max_streak: number
		name: string
		points: number
		user_type: string
	}
}
export function useProfile() {
	const { data: user, isLoading } = useQuery<ProfileResponse>({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
	})
	return {
		user,
		isLoading,
	}
}
