import { useQuery } from '@tanstack/react-query'
import { localitiesService } from '@/services/localities/localities.service'

export const useGetLocalities = ({ districtId }: { districtId?: number | null }) => {
	const {
		data,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['localities', districtId],
		queryFn: () => localitiesService.getAllLocalities(districtId),
		staleTime: 5 * 60 * 1000,
	})

	return {
		localities: data?.data || undefined,
		isLoading,
		isError,
		error
	}
}
