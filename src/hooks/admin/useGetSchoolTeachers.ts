import { teachersService } from '@/services/organization/teachers/teachers.service'
import { useQuery } from '@tanstack/react-query'

export const useGetSchoolTeachers = () => {
	const {
		data: teachersData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['schoolTeachersAdmin'],
		queryFn: () => teachersService.getSchoolTeachersAdmin(),
		staleTime: 10 * 60 * 1000,
	})
	return { teachersData, isLoading, isError, error }
}
