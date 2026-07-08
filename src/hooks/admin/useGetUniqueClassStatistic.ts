import { useQuery } from '@tanstack/react-query'

import { schoolClassesService } from '@/services/organization/classes/schoolClasses.service'
import { Id } from '@/shared/types/types'

export const useGetSchoolClasses = (id:Id) => {
	const {
		data: schoolClassesData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['schoolClassesAdmin'],
		queryFn: () => schoolClassesService.getUniqueClassStatisticAdmin(id),
		staleTime: 10 * 60 * 1000,
	})
	return { schoolClassesData, isLoading, isError, error }
}
