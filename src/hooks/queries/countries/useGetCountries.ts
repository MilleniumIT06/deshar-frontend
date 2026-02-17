import { useQuery } from '@tanstack/react-query'

import { countryService } from '@/services/country.service'

export const useGetCountries = () => {
	const {
		data: countries,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['countries'],
		queryFn: () => countryService.getAllCountries(),
	})
	return { countries, isLoading, isError }
}
