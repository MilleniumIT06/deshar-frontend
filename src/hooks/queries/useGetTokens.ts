import { useQuery } from '@tanstack/react-query'

import { tokenService } from '@/services/token.service'

export const useGetTokens = () => {
	const {
		data: tokens,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['tokens'],
		queryFn: () => tokenService.getTokens(),
	})
	return { tokens, isLoading, isError, error }
}
