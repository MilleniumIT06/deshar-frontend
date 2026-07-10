import { useQuery } from '@tanstack/react-query'
import { statsService } from '@/services/admin/stats.service'

export const useGetAllSchoolStudents = () => {
	const {
		data: schoolClassesData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['adminStats-schoolAllStudents'],
		queryFn: () => statsService.getSchoolAllStudents(),
		staleTime: 10 * 60 * 1000,
	})
	return { schoolClassesData, isLoading, isError, error }
}
