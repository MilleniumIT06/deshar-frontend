import './styles.scss'

export const CoursesBlock = ({ children, title }: { children: React.ReactNode; title: string }) => {
	return (
		<div className="CoursesBlock">
			<h3 className="CoursesBlock__title">{title}</h3>
			<ul className="CoursesBlock__cards">{children}</ul>
		</div>
	)
}
