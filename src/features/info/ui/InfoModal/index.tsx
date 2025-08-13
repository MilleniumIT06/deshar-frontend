/* eslint-disable no-console */
import { Modal } from "@/widgets/Modal/ui"

import { InfoModalContent } from "./InfoModalContent";


interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: "success" | "fail";
}
export const InfoModal = ({ isOpen, onClose, type = "success" }: InfoModalProps) => {
    const handleSuccess = () => {
        console.log('success');
    }
    const handleFail = () => {
        console.log('fail');
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            variant="info"
        >
            <InfoModalContent onFail={handleFail} onSuccess={handleSuccess} type={type} />
        </Modal>
    )
}