import { Modal } from '@/widgets/Modal/ui'

import { SelectModalContent } from './SelectModalContent'
import './styles.scss'

interface SelectModalProps {
	isOpen: boolean
	onClose: () => void
}
export const SelectModal = ({ isOpen, onClose }: SelectModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} variant="info" className="SelectModal">
			<SelectModalContent onClose={onClose} />
		</Modal>
	)
}
