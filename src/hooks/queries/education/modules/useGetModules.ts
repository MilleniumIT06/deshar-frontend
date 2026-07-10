import { educationService } from '@/services/education/education.service'
import { useQuery } from '@tanstack/react-query'

export const useGetModules = () => {
	const {
		data,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['ing-modules'],
		queryFn: () => educationService.getModules(),
		staleTime: 20 * 60 * 1000,
	})

	return {
		modules: data || undefined,
		isLoading,
		isError,
		error
	}
}
