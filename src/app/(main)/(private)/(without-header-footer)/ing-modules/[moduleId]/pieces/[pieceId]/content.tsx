'use client'
import { useParams } from 'next/navigation'

import { useGetPieceById } from '@/hooks/queries/education/pieces/useGetPieceById'
import { useGetUniquePiece } from '@/hooks/queries/education/pieces/useGetUniquePiece'
import { Loader } from '@/shared/ui/Loader'
import './../../../../../styles.scss'
import { TrainersEngine } from '@/widgets/trainers-engine'

export const PiecesContent = () => {
	const { moduleId, pieceId } = useParams<{ moduleId: string; pieceId: string }>()
	const { data, isError, isLoading } = useGetPieceById(Number(moduleId), Number(pieceId))
	const { data: uniquePiece, isLoading: isPieceLoading } = useGetUniquePiece(Number(moduleId), Number(pieceId))
	if (isLoading || isPieceLoading) return <Loader />
	if (isError) return 'ERROR'
	return (
		<section className="IngModulesPageContent">
			{data && data.data && data.data.length > 0 ? (
				<TrainersEngine
					data={data.data}
					engineStatus="engineSuccess"
					config={{
						time: uniquePiece?.piece.estimated_time ?? 180,
					}}
				/>
			) : (
				'neznayu'
			)}
		</section>
	)
}
