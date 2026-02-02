import './styles.scss'

export const Badge = ({ children }: { children: string | number }) => {
	return <span className="Badge">{children}</span>
}
