import { educationService } from '@/services/education/education.service'
import { Id } from '@/shared/types/types'
import { useQuery } from '@tanstack/react-query'

export const useGetPieceById = (moduleId:Id,pieceId:Id) => {
	const {
		data,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['ing-module-piece',moduleId,pieceId],
		queryFn: () => educationService.getPieceLessons(moduleId,pieceId),
		staleTime: 20 * 60 * 1000,
	})
	
	return {
		data: data || undefined,
		isLoading,
		isError,
		error
	}
}
