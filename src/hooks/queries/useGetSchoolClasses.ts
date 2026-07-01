import { useQuery } from '@tanstack/react-query'

import { schoolClassesService } from '@/services/schoolClasses.service'

export const useGetSchoolClasses = () => {
	const {
		data: schoolClasses,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['schoolClasses'],
		queryFn: () => schoolClassesService.getAllSchoolClasses(),
	})
	return { schoolClasses, isLoading, isError, error }
}
