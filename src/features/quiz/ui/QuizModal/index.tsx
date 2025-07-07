import { Modal } from "@/widgets/Modal/ui"

import { QuizContent } from "./QuizContent";

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export const QuizModal = ({ isOpen, onClose }: QuizModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <QuizContent />
        </Modal>
    )
}