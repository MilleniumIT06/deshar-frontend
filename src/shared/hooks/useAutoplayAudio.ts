// shared/hooks/useAutoplayUnlock.ts
import { useEffect, useRef } from 'react'

type UnlockCallback = () => void

const INTERACTION_EVENTS: (keyof WindowEventMap)[] = ['click', 'keydown', 'pointerdown', 'touchend']

let isUnlocked = false
let listenersAttached = false
const pendingCallbacks = new Set<UnlockCallback>()

function unlock() {
	isUnlocked = true
	pendingCallbacks.forEach(cb => cb())
	pendingCallbacks.clear()
	INTERACTION_EVENTS.forEach(event => window.removeEventListener(event, unlock))
	listenersAttached = false
}

function attachListeners() {
	if (listenersAttached || isUnlocked) return
	listenersAttached = true
	INTERACTION_EVENTS.forEach(event => window.addEventListener(event, unlock, { once: true, passive: true }))
}

export function useAutoplayAudio(callback: UnlockCallback, enabled: boolean) {
	const callbackRef = useRef(callback)
	callbackRef.current = callback

	useEffect(() => {
		if (!enabled) return

		if (isUnlocked) {
			callbackRef.current()
			return
		}

		const wrapped = () => callbackRef.current()
		pendingCallbacks.add(wrapped)
		attachListeners()

		return () => {
			pendingCallbacks.delete(wrapped)
		}
	}, [enabled])
}
