import { statsService } from '@/services/admin/stats.service'
import { useQuery } from '@tanstack/react-query'

export const useGetRepublicStats = () => {
	const {
		data,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['ministry-republic-stats' ],
		queryFn: () => statsService.getMinistryRepublicStats(),
		staleTime: 15 * 60 * 1000,
	})

	return {
		republicStats: data || undefined,
		isLoading,
		isError,
		error
	}
}
