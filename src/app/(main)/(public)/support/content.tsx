import { type FaqItem } from '@/entities/faq'
import { SupportForm } from '@/features/Support/ui/SupportForm'
import { FaqSection } from '@/widgets/FaqSection'

const faqItems: FaqItem[] = [
	{ id: '1', question: 'Как оформить заказ?', answer: 'Добавьте товар в корзину и перейдите к оформлению.' },
	{ id: '2', question: 'Как оформить заказ?', answer: 'Добавьте товар в корзину и перейдите к оформлению.' },
]
export const SupportContent = () => {
	return (
		<main>
			<SupportForm />
			<FaqSection items={faqItems} />
		</main>
	)
}
