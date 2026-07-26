import { statsService } from '@/services/admin/stats.service'
import { useQuery } from '@tanstack/react-query'

export const useGetDepartmentTeachers = () => {
	const {
		data:departmentTeachers,
		isLoading:isDepartmentTeachersLoading,
		isError:isDepartmentTeachersError,
		error,
	} = useQuery({
		queryKey: ['adminDepartmentTeachers'],
		queryFn: () => statsService.getDepartmentTeachers(),
		staleTime: 10 * 60 * 1000,
	})
	return { departmentTeachers, isDepartmentTeachersLoading, isDepartmentTeachersError, error }
}
