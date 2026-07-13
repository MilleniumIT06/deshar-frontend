
import './header.scss'
import { BreakBtn } from '@/components/Engine/BreakBtn'
import { MenuBtn } from '@/components/Engine/MenuBtn'
import { ProgressBar } from '@/components/Engine/ProgressBar'

import { IconClose, IconOpen } from './icons'

export const EngineHeader = ({
	handleMenuClick,
	menuIsOpen,
	handleHelpMenuOpen,
	currentTrainerIndex,
	totalTrainersCount,
}: {
	handleMenuClick: () => void
	handleHelpMenuOpen: () => void
	menuIsOpen: boolean
	currentTrainerIndex: number
	totalTrainersCount: number
}) => {
	return (
		<header className="engine-header">
			<MenuBtn handleClick={handleMenuClick}>
				<div className="engine-header__menu-content">
					{!menuIsOpen ? (
						<>
							<IconOpen />
							<span className="engine-header__menu-text">МЕНЮ</span>
						</>
					) : (
						<>
							<IconClose />
							<span className="engine-header__menu-text">ЗАКРЫТЬ</span>
						</>
					)}
				</div>
			</MenuBtn>

			<div className="engine-header__progress">
				<ProgressBar current={currentTrainerIndex + 1} total={totalTrainersCount} />
			</div>

			<div className="engine-header__actions">
				<BreakBtn handleClick={handleHelpMenuOpen} />
			</div>
		</header>
	)
}
