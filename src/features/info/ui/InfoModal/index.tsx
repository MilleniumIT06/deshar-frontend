import { Modal } from "@/widgets/Modal/ui"


interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            variant="quiz"
        >
            <QuizContent onClose={onClose} />
        </Modal>
    )
}