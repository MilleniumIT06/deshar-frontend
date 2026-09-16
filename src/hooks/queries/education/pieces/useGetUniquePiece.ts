import { useQuery } from '@tanstack/react-query'

import { educationService } from '@/services/education/education.service'
import { type Id } from '@/shared/types/types'

export const useGetUniquePiece = (moduleId: Id, pieceId: Id) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['ing-module-unique-Piece', moduleId, pieceId],
		queryFn: () => educationService.getPiece(moduleId, pieceId),
		staleTime: 20 * 60 * 1000,
	})

	return {
		data: data || undefined,
		isLoading,
		isError,
		error,
	}
}
