import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[]
	readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
	prompt(): Promise<void>
}

declare global {
	interface WindowEventMap {
		beforeinstallprompt: BeforeInstallPromptEvent
	}
}

export function usePWAInstall() {
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
	const [isInstallable, setIsInstallable] = useState(false)

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
			e.preventDefault()
			setDeferredPrompt(e)
			setIsInstallable(true)
		}

		const handleAppInstalled = () => {
			setIsInstallable(false)
			setDeferredPrompt(null)
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
		window.addEventListener('appinstalled', handleAppInstalled)

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
			window.removeEventListener('appinstalled', handleAppInstalled)
		}
	}, [])

	const handleInstallClick = async () => {
		if (!deferredPrompt) return

		await deferredPrompt.prompt()
		const { outcome } = await deferredPrompt.userChoice
		console.log(`User response to the install prompt: ${outcome}`)

		setDeferredPrompt(null)
		setIsInstallable(false)
	}

	return { isInstallable, handleInstallClick }
}
