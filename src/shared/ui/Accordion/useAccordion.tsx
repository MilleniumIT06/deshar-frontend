'use client'

import { useState, useCallback } from 'react'

interface UseAccordionParams {
	allowMultiple?: boolean
	defaultOpenId?: string
}

export const useAccordion = ({ allowMultiple = false, defaultOpenId }: UseAccordionParams = {}) => {
	const [openIds, setOpenIds] = useState<Set<string>>(defaultOpenId ? new Set([defaultOpenId]) : new Set())

	const toggle = useCallback(
		(id: string) => {
			setOpenIds(prev => {
				const next = new Set(allowMultiple ? prev : [])
				if (prev.has(id)) next.delete(id)
				else next.add(id)
				return next
			})
		},
		[allowMultiple],
	)

	const isOpen = useCallback((id: string) => openIds.has(id), [openIds])

	return { isOpen, toggle }
}
