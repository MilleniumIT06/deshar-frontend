import './styles.scss'
import { EngineButton } from '@/components/Engine/Button'

export const LessonCompletedModalContent = ({ onBtnClick }: { onBtnClick: () => void }) => {
	return (
		<div className="LessonCompletedModalContent">
			<div className="LessonCompletedModalContent__inner">
				<p className="LessonCompletedModalContent__text">
					Вы уже прошли данный урок, повторное прохождение не повлияет на предыдущий результат
				</p>
				<EngineButton variant="primary" onClick={onBtnClick}>
					OK
				</EngineButton>
			</div>
		</div>
	)
}
