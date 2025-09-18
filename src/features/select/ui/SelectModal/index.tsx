'use client'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import BottomSheet from '@/widgets/BottomSheet'
import { Modal } from '@/widgets/Modal/ui'

import { SelectModalContent } from './SelectModalContent'
import './styles.scss'

interface SelectModalProps {
	isOpen: boolean
	onClose: () => void
}
export const SelectModal = ({ isOpen, onClose }: SelectModalProps) => {
	const isMobile = useMediaQuery('(max-width: 576px)')
	return !isMobile ? (
		<Modal isOpen={isOpen} onClose={onClose} variant="info" className="SelectModal">
			<SelectModalContent onClose={onClose} />
		</Modal>
	) : (
		<BottomSheet isOpen={isOpen} onClose={onClose}>
			<SelectModalContent onClose={onClose} />
		</BottomSheet>
	)
}
