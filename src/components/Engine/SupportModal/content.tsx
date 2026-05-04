import { EngineButton } from '../Button'
import { EngineInput } from '../Input'
import { Textarea } from '../Textarea'
import './styles.scss'

export const SupportModalContent = ({ onSubmit, onCancel }: { onSubmit?: () => void; onCancel?: () => void }) => {
	return (
		<div className="support-form">
			<h5 className="support-form__title">Написать в поддержку</h5>

			<div className="support-form__divider" />

			<div className="support-form__fields">
				<EngineInput fullWidth label="E-mail" className="support-form__input" />
				<Textarea fullWidth label="Комментарий" className="support-form__textarea" />
			</div>

			<div className="support-form__actions">
				<EngineButton variant="primary" onClick={onSubmit} className="support-form__btn">
					Отправить
				</EngineButton>
				<EngineButton variant="secondary" onClick={onCancel} className="support-form__btn">
					Отмена
				</EngineButton>
			</div>
		</div>
	)
}
