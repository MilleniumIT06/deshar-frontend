import { useQuery } from '@tanstack/react-query'

import { statsService } from '@/services/admin/stats.service'

export const useGetSchoolStatistic = () => {
	const {
		data: schoolStatisticAdminData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['schoolStatisticAdminQueryKey'],
		queryFn: () => statsService.getAdminSchoolStats(),
		staleTime: 10 * 60 * 1000,
	})

	return { schoolStatisticAdminData, isLoading, isError, error }
}
