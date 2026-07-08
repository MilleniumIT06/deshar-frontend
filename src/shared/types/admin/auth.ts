import type { RoleName } from "../user.types"


export interface AuthState {
	role: RoleName
	isLoading: boolean
	error: string | null
}

export interface UseRoleReturn {
	role: RoleName
	hasRole: (allowedRole: RoleName | RoleName[]) => boolean
	setRole: (newRole: RoleName) => void
	clearRole: () => void
	isLoading: boolean
	error: string | null
}
