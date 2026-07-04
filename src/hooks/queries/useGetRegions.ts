import { useQuery } from '@tanstack/react-query'

import { regionService } from '@/services/localities/regions.service'

export const useGetRegions = () => {
	const {
		data: regions,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['regions'],
		queryFn: () => regionService.getAllRegions(),
		retry: 2,
	})
	return { regions, isLoading, isError, error }
}
