import { useQuery } from '@tanstack/react-query'

import { statsService } from '@/services/admin/stats.service'

export const useGetDistrictStats = () => {
	const {
		data:districtStats,
		isLoading:isDistrictStatsLoading,
		isError:isDistrictStatsError,
		error,
	} = useQuery({
		queryKey: ['adminDistrictStats'],
		queryFn: () => statsService.getDepartmentDistrictStats(),
		staleTime: 10 * 60 * 1000,
	})
	return { districtStats, isDistrictStatsLoading, isDistrictStatsError, error }
}
