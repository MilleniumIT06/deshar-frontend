import { useQuery } from '@tanstack/react-query'

import { statsService } from '@/services/admin/stats.service'

import type { Id } from '@/shared/types/types'

export const useGetDistricts = () => {
	const {
		data: ministryDistricts,
		isLoading: isMinistryDistrictsLoading,
		isError: isMinistryDistrictsError,
		error,
	} = useQuery({
		queryKey: ['adminMinistryDistricts'],
		queryFn: () => statsService.getMinistryDistricts(),
		staleTime: 10 * 60 * 1000,
	})
	return { ministryDistricts, isMinistryDistrictsLoading, isMinistryDistrictsError, error }
}
export const useGetDistrictById = (id: Id) => {
	const {
		data: ministryDistrict,
		isLoading: isMinistryDistrictLoading,
		isError: isMinistryDistrictError,
		error,
	} = useQuery({
		queryKey: ['adminMinistryDistrict', id],
		queryFn: () => statsService.getMinistryDistrictStats(id),
		staleTime: 10 * 60 * 1000,
		enabled: Boolean(id),
	})
	return { ministryDistrict, isMinistryDistrictLoading, isMinistryDistrictError, error }
}
