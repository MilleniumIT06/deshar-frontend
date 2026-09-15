'use client'

import { AccordionItem } from './AccordionItem'
import { useAccordion } from './useAccordion'

export interface AccordionEntry {
	id: string
	title: React.ReactNode
	content: React.ReactNode
}

interface AccordionProps {
	items: AccordionEntry[]
	allowMultiple?: boolean
	defaultOpenId?: string
}

export const Accordion = ({ items, allowMultiple, defaultOpenId }: AccordionProps) => {
	const { isOpen, toggle } = useAccordion({ allowMultiple, defaultOpenId })

	return (
		<div>
			{items.map(item => (
				<AccordionItem key={item.id} {...item} isOpen={isOpen(item.id)} onToggle={toggle} />
			))}
		</div>
	)
}
