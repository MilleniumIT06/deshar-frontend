import cn from 'classnames'

import { SignInForm } from '@/features/auth/SignIn/ui/SignInForm'

import styles from './../../page.module.scss'

export default function SignIn() {
	return (
		<main>
			<section className={cn(styles.index, styles.signIn)}>
				<div className="container">
					<div className={styles.inner}>
						<SignInForm />
					</div>
				</div>
			</section>
		</main>
	)
}
