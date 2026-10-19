'use client'
import dynamic from 'next/dynamic'
import './content.scss'

const ProfileForm = dynamic(() => import('@/features/profile/ProfileForm').then(mod => mod.ProfileForm), { ssr: false })
export const ProfilePageContent = () => {
	return (
		<section className="ProfilePageContent">
			<div className="container">
				<div className="ProfilePageContent__inner">
					<div className="ProfilePageContent__main">
						<h1 className="ProfilePageContent__title">Личная информация</h1>
						<div className="ProfilePageContent__form">
							<ProfileForm />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
