import { useQuery } from '@tanstack/react-query'

import { citiesService } from '@/services/cities.service'

export const useGetCities = () => {
	const { data: cities, isLoading } = useQuery({
		queryKey: ['cities'],
		queryFn: () => citiesService.getAllCities(),
	})
	return { cities, isLoading }
}
