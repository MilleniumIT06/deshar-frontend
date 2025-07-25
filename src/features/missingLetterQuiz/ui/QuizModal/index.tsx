import { Modal } from "@/widgets/Modal/ui"

import { QuizContent } from "./missingLetterQuizContent";

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export const QuizModal = ({ isOpen, onClose }: QuizModalProps) => {
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