import { useQuery } from '@tanstack/react-query'

import { districtsService } from '@/services/districts.service'

export const useGetDistricts = () => {
	const {
		data: districts,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['districts'],
		queryFn: () => districtsService.getAllDistricts(),
	})
	return { districts, isLoading, isError }
}
