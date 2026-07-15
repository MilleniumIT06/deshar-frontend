import { EngineModal } from '../Modal'
import { AlertModalContent } from './content'

interface AlertModalProps {
	isOpen: boolean
	onClose: () => void
	onYesBtnClick:()=>void
	onCancelBtnClick:()=>void
}
export const AlertModal = ({ isOpen, onClose,onCancelBtnClick,onYesBtnClick }: AlertModalProps) => {
	return (
		<EngineModal variant="alert" isOpen={isOpen} onClose={onClose}>
			<AlertModalContent onCancelBtnClick={onCancelBtnClick} onYesBtnClick={onYesBtnClick}/>
		</EngineModal>
	)
}
