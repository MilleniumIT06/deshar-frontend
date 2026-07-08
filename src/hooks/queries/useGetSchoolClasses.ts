import { useQuery } from '@tanstack/react-query'

import { schoolClassesService } from '@/services/organization/classes/schoolClasses.service'

export const useGetSchoolClasses = ({ schoolId }: { schoolId?: number | null }) => {
	const {
		data: schoolClasses,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['schoolClasses', schoolId],
		queryFn: () => schoolClassesService.getAllSchoolClasses(schoolId),
		staleTime: 5 * 60 * 1000,
	})
	return { schoolClasses, isLoading, isError, error }
}
