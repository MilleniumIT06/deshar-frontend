import { useState, useEffect, useCallback } from 'react'

interface Connection {
	source: string
	target: string
}

export const useCategoryMatcher = () => {
	const [connections, setConnections] = useState<Connection[]>([])
	const [activeSource, setActiveSource] = useState<string | null>(null)
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (activeSource) {
				setMousePos({ x: e.clientX, y: e.clientY })
			}
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [activeSource])

	const startConnection = useCallback(
		(id: string) => {
			// Если уже есть связь для этого источника, ничего не делаем
			if (connections.some(c => c.source === id)) return
			setActiveSource(id)
		},
		[connections],
	)

	const endConnection = useCallback(
		(targetId: string) => {
			if (activeSource) {
				setConnections(prev => [...prev, { source: activeSource, target: targetId }])
				setActiveSource(null)
			}
		},
		[activeSource],
	)

	const resetConnections = () => setConnections([])

	return {
		connections,
		activeSource,
		mousePos,
		startConnection,
		endConnection,
		resetConnections,
	}
}
