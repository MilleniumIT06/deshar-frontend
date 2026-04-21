import { EngineModal } from '../Modal'
import { SupportModalContent } from './content'

interface SupportModalProps {
	isOpen: boolean
	onClose: () => void
}

export const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
	return (
		<EngineModal variant="support" isOpen={isOpen} onClose={onClose}>
			<SupportModalContent />
		</EngineModal>
	)
}
