import styles from './styles.module.scss';
export const Button = ({ type, children }: {
    type: "primary" | "secondary"
    children: React.ReactNode;
}) => {
    return <button className={`${styles.index} ${type === "primary" ? styles.primary : styles.secondary}`}>
        {children}
    </button >
}