import { useState, useEffect } from 'react'

export const useMediaQuery = (mediaQuery: string): boolean => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const mediaQueryList = window.matchMedia(mediaQuery)
		setMatches(mediaQueryList.matches)

		const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches)

		if (mediaQueryList.addEventListener) {
			mediaQueryList.addEventListener('change', handleChange)
			return () => mediaQueryList.removeEventListener('change', handleChange)
		}
	}, [mediaQuery])

	return matches
}
