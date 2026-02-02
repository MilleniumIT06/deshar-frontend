export type Role = 'admin' | 'teacher' | 'vicePrincipal' | 'principal' | 'department' | 'ministry' | null

export interface AuthState {
	role: Role
	isLoading: boolean
	error: string | null
}

export interface UseRoleReturn {
	role: Role
	hasRole: (allowedRole: Role | Role[]) => boolean
	setRole: (newRole: Role) => void
	clearRole: () => void
	isLoading: boolean
	error: string | null
}
