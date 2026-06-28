
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