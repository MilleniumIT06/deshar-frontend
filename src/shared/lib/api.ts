// shared/lib/api.ts

const API_URL = process.env.SERVER_URL 
    ? `${process.env.SERVER_URL}/api` 
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

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

export interface RegisterData {
    name: string
    email: string
    password: string
    password_confirmation: string
    user_type?: 'student' | 'teacher'
    birth_date?: string
    country_id?: number
    region_id?: number
    district_id?: number
    city_id?: number
    school_id?: number
    school_class_id?: number
    avatar?: string
}

export interface UpdateProfileData {
    name?: string
    email?: string
    avatar?: string
    birth_date?: string
    country_id?: number
    region_id?: number
    district_id?: number
    city_id?: number
    school_id?: number
    school_class_id?: number
    preferences?: Record<string, any>
    settings?: Record<string, any>
}

function getHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    }
}

async function handleResponse(response: Response) {
    let data
    try {
        data = await response.json()
    } catch {
        throw new Error('Ошибка сервера')
    }

    if (!response.ok) {
        console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            data: data,
            url: response.url
        })

        if (response.status === 422 && data.errors) {
            const errorMessages = Object.values(data.errors).flat().join(', ')
            throw new Error(errorMessages)
        }
        
        if (response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('user')
                document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.desharing.ru'
            }
            throw new Error(data.message || 'Сессия истекла. Пожалуйста, войдите заново.')
        }

        if (response.status === 404) {
            throw new Error(`API endpoint не найден: ${response.url}`)
        }

        throw new Error(data.message || `Ошибка сервера: ${response.status}`)
    }

    return {
        success: true,
        ...data,
    }
}

export const apiClient = {
    // ========== АВТОРИЗАЦИЯ ==========

    async login(email: string, password: string) {
        console.log('🔐 Login attempt to:', `${API_URL}/auth/login`)
        console.log('📧 Email:', email)

        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const result = await handleResponse(response)
        
        if (result.success && result.token && result.user) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('auth_token', result.token)
                localStorage.setItem('user', JSON.stringify(result.user))
                document.cookie = `auth_token=${result.token}; path=/; max-age=604800; SameSite=Lax; domain=.desharing.ru`
            }
        }

        return result
    },

    async register(data: RegisterData) {
        console.log('📝 Register attempt to:', `${API_URL}/auth/register`)
        console.log('📊 Register data:', { ...data, password: '***', password_confirmation: '***' })

        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data),
        })

        const result = await handleResponse(response)
        
        if (result.success && result.token && result.user) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('auth_token', result.token)
                localStorage.setItem('user', JSON.stringify(result.user))
                document.cookie = `auth_token=${result.token}; path=/; max-age=604800; SameSite=Lax; domain=.desharing.ru`
            }
        }

        return result
    },

    async logout() {
        try {
            const token = localStorage.getItem('auth_token')
            if (!token) {
                throw new Error('No token found')
            }

            const response = await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            return await handleResponse(response)
        } finally {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('user')
                document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.desharing.ru'
            }
        }
    },

    async forgotPassword(email: string) {
        const response = await fetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email }),
        })

        return handleResponse(response)
    },

    async resetPassword(data: {
        email: string
        token: string
        password: string
        password_confirmation: string
    }) {
        const response = await fetch(`${API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data),
        })

        return handleResponse(response)
    },

    // ========== ПОЛЬЗОВАТЕЛЬ ==========

    async getCurrentUser() {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: getHeaders(),
        })

        const result = await handleResponse(response)
        
        if (result.success && result.user) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(result.user))
            }
        }

        return result
    },

    async updateProfile(data: UpdateProfileData) {
        const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        })

        const result = await handleResponse(response)
        
        if (result.success && result.user) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(result.user))
            }
        }

        return result
    },

    async updatePassword(data: {
        current_password: string
        password: string
        password_confirmation: string
    }) {
        const response = await fetch(`${API_URL}/auth/password`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        })

        return handleResponse(response)
    },

    async getStats() {
        const response = await fetch(`${API_URL}/auth/stats`, {
            headers: getHeaders(),
        })

        return handleResponse(response)
    },

    async deleteAccount() {
        const response = await fetch(`${API_URL}/auth/account`, {
            method: 'DELETE',
            headers: getHeaders(),
        })

        const result = await handleResponse(response)
        
        if (result.success) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('user')
                document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.desharing.ru'
            }
        }

        return result
    },

    // ========== ЗАЩИЩЕННЫЕ ЗАПРОСЫ ==========

    async fetchProtected(url: string, options: RequestInit = {}) {
        const response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: {
                ...getHeaders(),
                ...options.headers,
            },
        })

        if (response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('user')
                window.location.href = '/sign-in'
            }
            throw new Error('Unauthorized')
        }

        return response
    },

    async get(endpoint: string, params?: Record<string, any>) {
        const url = params 
            ? `${API_URL}${endpoint}?${new URLSearchParams(params)}` 
            : `${API_URL}${endpoint}`

        const response = await fetch(url, {
            headers: getHeaders(),
        })

        return handleResponse(response)
    },

    async post(endpoint: string, data?: any) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        })

        return handleResponse(response)
    },

    async put(endpoint: string, data?: any) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        })

        return handleResponse(response)
    },

    async patch(endpoint: string, data?: any) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        })

        return handleResponse(response)
    },

    async delete(endpoint: string) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(),
        })

        return handleResponse(response)
    },
}