import { Logo } from '@/shared/ui/Logo'
import './styles.scss'

export const DevState = () => {
	return (
		<section className="DevState">
			<div className="DevState__inner">
				<Logo className="DevStateLogo" size="large" />
				<h1>
					Проект находится на стадии <span>разработки</span>
				</h1>
			</div>
		</section>
	)
}
