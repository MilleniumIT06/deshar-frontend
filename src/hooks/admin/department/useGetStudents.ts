import { useQuery } from '@tanstack/react-query'

import { statsService } from '@/services/admin/stats.service'

export const useGetDepartmentStudents = () => {
	const {
		data:departmentStudents,
		isLoading:isDepartmentStudentsLoading,
		isError:isDepartmentStudentsError,
		error,
	} = useQuery({
		queryKey: ['adminDepartmentStudents'],
		queryFn: () => statsService.getDepartmentStudents(),
		staleTime: 10 * 60 * 1000,
	})
	return { departmentStudents, isDepartmentStudentsLoading, isDepartmentStudentsError, error }
}
