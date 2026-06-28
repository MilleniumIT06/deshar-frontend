// shared/lib/auth/index.ts

import { apiClient } from '../lib/api'

export interface User {
    id: number
    name: string
    email: string
    avatar: string
    user_type: 'student' | 'teacher' | 'admin'
    level: number
    level_name: string
    level_color: string
    level_progress: number
    xp: number
    xp_to_next_level: number
    current_streak: number
    max_streak: number
    is_online: boolean
    is_active: boolean
    is_banned: boolean
    last_activity: string
    last_login_at: string | null
    role?: {
        id: number
        name: string
        slug: string
    }
    school?: {
        id: number
        name: string
    }
    school_class?: {
        id: number
        name: string
        grade: string
        letter: string
    }
    location?: {
        country?: string
        region?: string
        district?: string
        city?: string
    }
    stats?: {
        total_tasks_completed: number
        total_lessons_completed: number
        total_pieces_completed: number
        total_modules_completed: number
    }
    preferences?: Record<string, any>
    settings?: Record<string, any>
    created_at: string
    updated_at: string
}

export const auth = {
    getToken(): string | null {
        if (typeof window === 'undefined') return null
        return localStorage.getItem('auth_token')
    },

    setToken(token: string): void {
        if (typeof window === 'undefined') return

        localStorage.setItem('auth_token', token)
        document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Lax; domain=.desharing.ru`
    },

    removeToken(): void {
        if (typeof window === 'undefined') return

        localStorage.removeItem('auth_token')
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.desharing.ru'
    },

    getUser(): User | null {
        if (typeof window === 'undefined') return null
        const userStr = localStorage.getItem('user')
        if (!userStr) return null
        try {
            return JSON.parse(userStr) as User
        } catch {
            return null
        }
    },

    setUser(user: User): void {
        if (typeof window === 'undefined') return
        localStorage.setItem('user', JSON.stringify(user))
    },

    removeUser(): void {
        if (typeof window === 'undefined') return
        localStorage.removeItem('user')
    },

    getInitialState() {
        const user = this.getUser()
        return {
            user,
            isAuth: Boolean(user) && Boolean(this.getToken()),
        }
    },

    isAuthenticated(): boolean {
        return Boolean(this.getToken()) && Boolean(this.getUser())
    },

    isAdmin(): boolean {
        const user = this.getUser()
        return user?.user_type === 'admin' || user?.role?.slug === 'admin'
    },

    isTeacher(): boolean {
        const user = this.getUser()
        return user?.user_type === 'teacher' || user?.role?.slug === 'teacher'
    },

    isStudent(): boolean {
        const user = this.getUser()
        return user?.user_type === 'student' || user?.role?.slug === 'student'
    },

    async login(email: string, password: string) {
        const result = await apiClient.login(email, password)
        
        if (result.success && result.user) {
            this.setUser(result.user)
        }
        
        return result
    },

    async register(data: any) {
        const result = await apiClient.register(data)
        
        if (result.success && result.user) {
            this.setUser(result.user)
        }
        
        return result
    },

    async logout(): Promise<void> {
        try {
            await apiClient.logout()
        } finally {
            this.removeToken()
            this.removeUser()
        }
    },

    async refreshUser(): Promise<User | null> {
        try {
            const result = await apiClient.getCurrentUser()
            if (result.success && result.user) {
                this.setUser(result.user)
                return result.user
            }
        } catch {
            await this.logout()
        }
        return null
    },
}