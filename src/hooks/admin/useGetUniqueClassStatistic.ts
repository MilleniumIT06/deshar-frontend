import { useQuery } from '@tanstack/react-query'

import { schoolClassesService } from '@/services/organization/classes/schoolClasses.service'
import { Id } from '@/shared/types/types'

export const useGetUniqueClassStatistic = (id:Id) => {
	const {
		data: classStatistic,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['uniqueClassStatisticAdmin', id],
		queryFn: () => schoolClassesService.getUniqueClassStatisticAdmin(id),
		staleTime: 10 * 60 * 1000,
	})
	return { classStatistic, isLoading, isError, error }
}
