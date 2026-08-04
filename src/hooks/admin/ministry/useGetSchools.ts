import { useQuery } from '@tanstack/react-query'

import { statsService } from '@/services/admin/stats.service'

import type { Id } from '@/shared/types/types'

export const useGetSchools = () => {
	const {
		data:ministrySchools,
		isLoading:isMinistrySchoolsLoading,
		isError:isMinistrySchoolsError,
		error,
	} = useQuery({
		queryKey: ['adminMinistrySchools'],
		queryFn: () => statsService.getMinistrySchools(),
		staleTime: 10 * 60 * 1000,
	})
	return { ministrySchools, isMinistrySchoolsLoading, isMinistrySchoolsError, error }
}
export const useGetSchoolById = (id:Id) => {
    const {
        data:ministrySchool,
        isLoading:isMinistrySchoolLoading,
        isError:isMinistrySchoolError,
        error,
    } = useQuery({
        queryKey: ['adminMinistrySchool',id],
        queryFn: () => statsService.getMinistrySchoolStats(id),
        staleTime: 10 * 60 * 1000,
        enabled: Boolean(id)
    })
    return { ministrySchool, isMinistrySchoolLoading, isMinistrySchoolError, error }
}
