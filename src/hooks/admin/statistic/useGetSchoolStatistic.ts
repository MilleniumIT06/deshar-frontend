import { statsService } from '@/services/admin/stats.service'
import { useQuery } from '@tanstack/react-query'
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
    console.log(schoolStatisticAdminData,'schoolClassesData')
	return { schoolStatisticAdminData, isLoading, isError, error }
}
