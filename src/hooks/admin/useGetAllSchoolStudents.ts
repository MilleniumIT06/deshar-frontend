import { useQuery } from '@tanstack/react-query'
import { statsService } from '@/services/admin/stats.service'

export const useGetAllSchoolStudents = () => {
	const {
		data: allSchoolStudents,
		isLoading:isAllSchoolStudentsLoading,
		isError:isAllSchoolStudentsError,
		error,
	} = useQuery({
		queryKey: ['adminStats-schoolAllStudents'],
		queryFn: () => statsService.getSchoolAllStudents(),
		staleTime: 10 * 60 * 1000,
	})
	return { allSchoolStudents, isAllSchoolStudentsLoading, isAllSchoolStudentsError, error }
}
