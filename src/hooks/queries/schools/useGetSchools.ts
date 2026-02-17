import { useQuery } from '@tanstack/react-query'

import { schoolsService } from '@/services/schools.service'

export const useGetSchools = () => {
	const {
		data: schools,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['schools'],
		queryFn: () => schoolsService.getAllSchools(),
	})
	return { schools, isLoading, isError }
}
