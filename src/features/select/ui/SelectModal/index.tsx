import { Modal } from '@/widgets/Modal/ui'

import { SelectModalContent } from './SelectModalContent'
import styles from './styles.module.scss'

interface SelectModalProps {
	isOpen: boolean
	onClose: () => void
}
export const SelectModal = ({ isOpen, onClose }: SelectModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} variant="info" className={styles.index}>
			<SelectModalContent onClose={onClose} />
		</Modal>
	)
}
