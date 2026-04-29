import { type RefObject } from 'react'
import './footer.scss'
import { EngineButton } from '@/components/Engine/Button'
import { Timer, type TimerRef } from '@/components/Engine/Timer'

export const EngineFooter = ({
	timerRef,
	onTimerEnd,
	onClickBtn,
}: {
	timerRef: RefObject<TimerRef | null>
	onTimerEnd: () => void
	onClickBtn: () => void
}) => {
	return (
		<footer className="engine-footer">
			<div className="engine-footer__container">
				<EngineButton variant="secondary" className="engine-footer__back-btn">
					<div className="engine-footer__back-content">
						<svg
							className="engine-footer__back-icon"
							width="16"
							height="14"
							viewBox="0 0 16 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.25574 6.34616L6.0339 0.268705C6.19885 0.0952232 6.41868 0 6.65308 0C6.88775 0 7.10746 0.09536 7.2724 0.268705L7.79701 0.820616C7.96182 0.993824 8.05262 1.22518 8.05262 1.47186C8.05262 1.7184 7.96182 1.95755 7.79701 2.13076L4.42611 5.68398H15.1356C15.6185 5.68398 16 6.08156 16 6.58956V7.36981C16 7.8778 15.6185 8.31548 15.1356 8.31548H4.38787L7.79688 11.8885C7.96169 12.062 8.05249 12.2871 8.05249 12.5338C8.05249 12.7802 7.96169 13.0085 7.79688 13.1818L7.27227 13.732C7.10733 13.9055 6.88762 14 6.65296 14C6.41855 14 6.19872 13.9042 6.03377 13.7307L0.25561 7.65343C0.0902777 7.4794 -0.000648499 7.24709 2.86102e-06 7.00014C-0.000516891 6.75237 0.0902777 6.51992 0.25574 6.34616Z"
								fill="currentColor"
							/>
						</svg>
						<span className="engine-footer__back-text">НАЗАД</span>
					</div>
				</EngineButton>

				<div className="engine-footer__timer">
					<Timer ref={timerRef} onEnd={onTimerEnd} criticalThreshold={20} />
				</div>

				<div className="engine-footer__actions">
					<EngineButton
						variant="primary"
						onClick={() => onClickBtn()}
						className="engine-footer__submit-btn">
						ПРОВЕРИТЬ
					</EngineButton>
				</div>
			</div>
		</footer>
	)
}
