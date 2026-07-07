import { modulesService } from '@/services/education/modules/modules.service'
import { Id } from '@/shared/types/types'
import { useQuery } from '@tanstack/react-query'

export const useGetModules = () => {
	const {
		data,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['ing-modules'],
		queryFn: () => modulesService.getModules(),
		staleTime: 20 * 60 * 1000,
	})

	return {
		modules: data || undefined,
		isLoading,
		isError,
		error
	}
}
