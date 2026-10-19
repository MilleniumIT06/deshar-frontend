import { API_URL } from '@/shared/api'

export const getAudioUrl = (audio: string | null): string | null => (audio ? `${API_URL.files()}${audio}` : null)
