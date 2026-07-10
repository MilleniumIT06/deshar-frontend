import { statsService } from '@/services/admin/stats.service'
import { useQuery } from '@tanstack/react-query'


export function useGetStats() {
	const { data: stats, isLoading,isError } = useQuery({
		queryKey: ['user stats'],
		queryFn: () => statsService.getUserStats(),
	})
	return {
		stats,
		isLoading,
		isError
	}
}
