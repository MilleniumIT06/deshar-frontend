'use client'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import BottomSheet from '@/widgets/BottomSheet'
import { Modal } from '@/widgets/Modal/ui'

import { QuizContent } from './missingLetterQuizContent'

interface QuizModalProps {
	isOpen: boolean
	onClose: () => void
	onSuccess: () => void
	onError: () => void
}
export const QuizModal = ({ isOpen, onClose, onSuccess, onError }: QuizModalProps) => {
	const isMobile = useMediaQuery('(max-width: 576px)')
	return !isMobile ? (
		<Modal isOpen={isOpen} onClose={onClose} variant="quiz">
			<QuizContent onClose={onClose} onError={onError} onSuccess={onSuccess} />
		</Modal>
	) : (
		<BottomSheet isOpen={isOpen} onClose={onClose}>
			<QuizContent onClose={onClose} onError={onError} onSuccess={onSuccess} />
		</BottomSheet>
	)
}
