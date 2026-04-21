import { EngineModal } from '../Modal'
import { AlertModalContent } from './content'

interface AlertModalProps {
	isOpen: boolean
	onClose: () => void
}
export const AlertModal = ({ isOpen, onClose }: AlertModalProps) => {
	return (
		<EngineModal variant="alert" isOpen={isOpen} onClose={onClose}>
			<AlertModalContent />
		</EngineModal>
	)
}
