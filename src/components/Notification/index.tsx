import styles from './styles.module.scss';
const SuccessIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12.6413L10.6027 15L16 10" stroke="#1BAA7D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="12" cy="12" r="8" stroke="#1BAA7D" stroke-width="2" />
    </svg>
)
const WarningIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="#E62914" stroke-width="2" />
        <path d="M12 8L12 13" stroke="#E62914" stroke-width="2" stroke-linecap="round" />
        <rect x="11" y="15" width="2" height="2" rx="1" fill="#E62914" />
    </svg>
)
export const Notification = ({
    type = "success",
    successMessage = "Успешно выполнено!",
    warningMessage = "Ответ неверный! Попробуйте еще раз."
}: {
    type: "success" | "warning";
    successMessage: string;
    warningMessage: string;
}) => {
    return (
        <div className={styles.index}>
            <span>{type === 'success' ? <SuccessIcon /> : <WarningIcon />}{type === 'success' ? successMessage : warningMessage}</span>
        </div>
    )
}