import { useQuery } from '@tanstack/react-query'

import { statsService } from '@/services/admin/stats.service'

import type { Id } from '@/shared/types/types'

export const useGetSchools = () => {
	const {
		data: departmentSchools,
		isLoading: isDepartmentSchoolsLoading,
		isError: isDepartmentSchoolsError,
		error,
	} = useQuery({
		queryKey: ['adminDepartmentSchools'],
		queryFn: () => statsService.getDepartmentSchools(),
		staleTime: 10 * 60 * 1000,
	})
	return { departmentSchools, isDepartmentSchoolsLoading, isDepartmentSchoolsError, error }
}
export const useGetSchoolById = (id: Id) => {
	const {
		data: departmentSchool,
		isLoading: isDepartmentSchoolLoading,
		isError: isDepartmentSchoolError,
		error,
	} = useQuery({
		queryKey: ['adminDepartmentSchool', id],
		queryFn: () => statsService.getDepartmentSchoolById(id),
		staleTime: 10 * 60 * 1000,
		enabled: Boolean(id),
	})
	return { departmentSchool, isDepartmentSchoolLoading, isDepartmentSchoolError, error }
}
