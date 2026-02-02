import { SignInForm } from '@/components/Admin/SignInForm'
import './styles.scss'

export const SignInContent = () => {
	return (
		<section className="SignInContent">
			<div className="SignInContent__inner">
				<div className="SignInContent__image_col">
					<div className="SignInContent__image_wrapper">
						<div className="SignInContent__image_tint" />
						<div className="SignInContent__image">
							<div>test</div>
						</div>
					</div>
				</div>
				<div className="SignInContent__form_col">
					<SignInForm />
				</div>
			</div>
		</section>
	)
}
