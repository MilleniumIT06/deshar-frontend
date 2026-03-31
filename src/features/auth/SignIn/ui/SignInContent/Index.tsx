'use client'

import { useSearchParams } from 'next/navigation'

import { SignInForm } from '@/features/auth/SignIn/ui/SignInForm'

export function SignInContent() {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

	return <SignInForm callbackUrl={callbackUrl} />
}
