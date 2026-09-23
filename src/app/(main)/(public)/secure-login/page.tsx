'use client'
import { useState, type FormEvent } from 'react'

export default function LoginPage() {
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<boolean>(false)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const res = await fetch('/api/auth', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password }),
		})

		if (res.ok) {
			window.location.href = '/'
		} else {
			setError(true)
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				flexDirection: 'column',
				fontFamily: 'sans-serif',
			}}>
			<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
				<h3>Доступ ограничен</h3>
				<input
					type="password"
					placeholder="Введите код доступа"
					value={password}
					onChange={e => setPassword(e.target.value)}
					style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
				/>
				<button
					type="submit"
					style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
					Войти
				</button>
				{error && <p style={{ color: 'red', fontSize: '14px' }}>Неверный код доступа</p>}
			</form>
		</div>
	)
}
