'use client'
/* eslint-disable no-console */
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import BottomSheet from '@/widgets/BottomSheet'
import { Modal } from '@/widgets/Modal/ui'

import { InfoModalContent } from './InfoModalContent'

interface InfoModalProps {
	isOpen: boolean
	onClose: () => void
	type: 'success' | 'fail'
	onFail: () => void
	onSuccess: () => void
}
export const InfoModal = ({ isOpen, onClose, type = 'success', onFail, onSuccess }: InfoModalProps) => {
	const isMobile = useMediaQuery('(max-width: 576px)')
	const handleSuccess = () => {
		console.log('success')
		onSuccess()
		onClose()
	}
	const handleFail = () => {
		console.log('fail')
		onFail()
		onClose()
	}
	return !isMobile ? (
		<Modal isOpen={isOpen} onClose={onClose} variant="info">
			<InfoModalContent onFail={handleFail} onSuccess={handleSuccess} type={type} />
		</Modal>
	) : (
		<BottomSheet isOpen={isOpen} onClose={onClose}>
			<InfoModalContent onFail={handleFail} onSuccess={handleSuccess} type={type} />
		</BottomSheet>
	)
}
