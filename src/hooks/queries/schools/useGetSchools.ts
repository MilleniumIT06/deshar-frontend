import { useQuery } from '@tanstack/react-query'

import { schoolsService } from '@/services/localities/schools.service'

export const useGetSchools = ({ localityId }: { localityId?: number | null }) => {
	const {
		data: schools,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['schools',localityId],
		queryFn: () => schoolsService.getAllSchools(localityId),
	})
	return { schools, isLoading, isError }
}
