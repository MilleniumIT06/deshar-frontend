import Link from 'next/link'
import './styles.scss'

export const ClassCardMain = ({
	title,
	linkText,
	linkHref,
	children,
}: {
	title: string
	linkText: string
	linkHref: string
	children: React.ReactNode
}) => {
	return (
		<div className="ClassCardMain">
			<div className="ClassCardMain__inner">
				<div className="ClassCardMain__head">
					<h3 className="ClassCardMain__title">{title}</h3>
					<Link href={linkHref} className="ClassCardMain__fullList">
						{linkText}
					</Link>
				</div>
				<div className="ClassCardMain__content">{children}</div>
			</div>
		</div>
	)
}
