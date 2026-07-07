import { modulesService } from '@/services/education/modules/modules.service'
import { Id } from '@/shared/types/types'
import { useQuery } from '@tanstack/react-query'

export const useGetModuleById = (id:Id) => {
	const {
		data,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['ing-module-by-id', id],
		queryFn: () => modulesService.getModuleById(id),
		staleTime: 20 * 60 * 1000,
	})

	return {
		module: data || undefined,
		isLoading,
		isError,
		error
	}
}
