'use client'

import { type RootState } from '@/app/_store'
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { toggleSoundEnabled } from '@/entities/settings/model/settings.slice'
import { Toggle } from '@/shared/ui/Toggle'

export const SettingsPageContent = () => {
	const dispatch = useAppDispatch()
	const isSoundEnabled = useAppSelector((state: RootState) => state.settings.soundEnabled)
	return (
		<section className="SettingsPageContent">
			<div className="container">
				<div className="SettingsPageContent__inner">
					<div className="SettingsPageContent__main">
						<h1 className="SettingsPageContent__title">Настройки</h1>
						<div className="SettingsPageContent__form">
							<Toggle label="Звук в тренажере" checked={isSoundEnabled} onChange={() => dispatch(toggleSoundEnabled())} />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
