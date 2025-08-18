import { Modal } from "@/widgets/Modal/ui"

import { QuizContent } from "./missingLetterQuizContent";

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onError: () => void;
}
export const QuizModal = ({ isOpen, onClose, onSuccess, onError }: QuizModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            variant="quiz"
        >
            <QuizContent onClose={onClose} onError={onError} onSuccess={onSuccess} />
        </Modal>
    )
}