'use client'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import BottomSheet from '@/widgets/BottomSheet'
import { Modal } from '@/widgets/Modal/ui'

import { PieceCompletedModalContent } from './PieceCompletedModalContent'

interface PieceCompletedModalProps {
	isOpen: boolean
	onClose: () => void
	handleClick: () => void
}
export const PieceCompletedModal = ({ isOpen, onClose, handleClick }: PieceCompletedModalProps) => {
	const isMobile = useMediaQuery('(max-width: 576px)')

	return !isMobile ? (
		<Modal isOpen={isOpen} onClose={onClose} variant="info">
			<PieceCompletedModalContent onBtnClick={handleClick} />
		</Modal>
	) : (
		<BottomSheet isOpen={isOpen} onClose={onClose}>
			<PieceCompletedModalContent onBtnClick={handleClick} />
		</BottomSheet>
	)
}
