import dynamic from 'next/dynamic'

export const Menu = dynamic(() => import('@/components/Engine/Menu').then(mod => mod.Menu), { ssr: false })

export const AlertModal = dynamic(() => import('@/components/Engine/AlertModal').then(mod => mod.AlertModal), {
	ssr: false,
})

export const SupportModal = dynamic(
	() => import('@/components/Engine/SupportModal').then(mod => mod.SupportModal),
	{ ssr: false },
)

export const EngineFinishScreen = dynamic(
	() => import('@/components/Engine/FinishScreen').then(mod => mod.EngineFinishScreen),
	{ ssr: false },
)
