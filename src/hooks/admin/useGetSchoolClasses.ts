import { useQuery } from '@tanstack/react-query'

import { schoolClassesService } from '@/services/admin/organization/classes/schoolClasses.service'

export const useGetSchoolClasses = () => {
	const {
		data: schoolClassesData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['schoolClassesAdmin'],
		queryFn: () => schoolClassesService.getAllSchoolClassesAdmin(),
		staleTime: 10 * 60 * 1000,
	})
	return { schoolClassesData, isLoading, isError, error }
}
