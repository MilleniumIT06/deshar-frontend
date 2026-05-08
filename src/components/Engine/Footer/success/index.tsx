import { EngineButton } from '../../Button'
import './styles.scss'

export const SuccessFooter = ({ onContinueBtnClick }: { onContinueBtnClick?: () => void }) => {
	return (
		<div className="success-footer">
			<div className="success-footer__container">
				<div className="success-footer__status">
					<div className="success-footer__icon-wrapper">
						<svg
							className="success-footer__status-icon"
							width="80"
							height="80"
							viewBox="0 0 80 80"
							fill="none">
							<circle cx="40" cy="40" r="40" fill="white" />
							<path
								d="M55 32.5L35.2067 51.3278C34.8136 51.7017 34.194 51.694 33.8103 51.3103L25.5 43"
								stroke="currentColor"
								strokeWidth="10"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<span className="success-footer__title">Правильный ответ</span>
				</div>

				<div className="success-footer__actions">
					{onContinueBtnClick && (
						<EngineButton
							variant="primary"
							onClick={onContinueBtnClick}
							className="success-footer__btn">
							Продолжить
							<svg
								className="success-footer__btn-icon"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none">
								<path
									d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
									fill="white"
								/>
							</svg>
						</EngineButton>
					)}
				</div>
			</div>
		</div>
	)
}
