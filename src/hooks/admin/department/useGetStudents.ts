import { statsService } from '@/services/admin/stats.service'
import { useQuery } from '@tanstack/react-query'

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
