import './styles.scss'
import { EngineButton } from '@/components/Engine/Button'

export const PieceCompletedModalContent = ({ onBtnClick }: { onBtnClick: () => void }) => {
	return (
		<div className="PieceCompletedModalContent">
			<div className="PieceCompletedModalContent__inner">
				<p className="PieceCompletedModalContent__text">
					Вы уже прошли данный урок, повторное прохождение не повлияет на предыдущий результат
				</p>
				<EngineButton variant="primary" onClick={onBtnClick}>
					OK
				</EngineButton>
			</div>
		</div>
	)
}
