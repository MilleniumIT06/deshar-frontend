import { FinishBtn } from '@/components/Engine/FinishBtn'
import './header.scss'
import { IconClose, IconOpen } from './icons'
import { MenuBtn } from '@/components/Engine/MenuBtn'
import { ProgressBar } from '@/components/Engine/ProgressBar'

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
				<FinishBtn handleClick={handleHelpMenuOpen} />
			</div>
		</header>
	)
}
