'use client'

import { Button } from '@/shared/ui/Button'

import { usePWAInstall } from '../model/usePWAInstall'

export function PWAInstallButton() {
	const { isInstallable, handleInstallClick } = usePWAInstall()

	if (!isInstallable) return null

	return (
		<Button onClick={handleInstallClick} variant="primary">
			Установить приложение
		</Button>
	)
}
