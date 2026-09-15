import { Accordion } from '@/shared/ui/Accordion'

import './styles.scss'

import type { FaqItem } from '@/entities/faq'

interface FaqSectionProps {
	title?: string
	items: FaqItem[]
}

export const FaqSection = ({ title = 'Часто задаваемые вопросы', items }: FaqSectionProps) => {
	const accordionItems = items.map(item => ({
		id: item.id,
		title: item.question,
		content: item.answer,
	}))

	return (
		<section className="FaqSection">
			<div className="container">
				<h2 className="FaqSection__title">{title}</h2>
				<Accordion items={accordionItems} />
			</div>
		</section>
	)
}
