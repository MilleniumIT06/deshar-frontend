import { useQuery } from '@tanstack/react-query'

import { localitiesService } from '@/services/localities/localities.service'

export const useGetLocalities = () => {
	const {
		data: localities,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['localities'],
		queryFn: () => localitiesService.getAllLocalities(),
	})
	return { localities, isLoading, isError, error }
}
