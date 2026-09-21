'use client'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import BottomSheet from '@/widgets/BottomSheet'
import { Modal } from '@/widgets/Modal/ui'

import { LessonCompletedModalContent } from './LessonCompletedModalContent'

interface LessonCompletedModalProps {
	isOpen: boolean
	onClose: () => void
	handleClick: () => void
}
export const LessonCompletedModal = ({ isOpen, onClose, handleClick }: LessonCompletedModalProps) => {
	const isMobile = useMediaQuery('(max-width: 576px)')

	return !isMobile ? (
		<Modal isOpen={isOpen} onClose={onClose} variant="info">
			<LessonCompletedModalContent onBtnClick={handleClick} />
		</Modal>
	) : (
		<BottomSheet isOpen={isOpen} onClose={onClose}>
			<LessonCompletedModalContent onBtnClick={handleClick} />
		</BottomSheet>
	)
}
