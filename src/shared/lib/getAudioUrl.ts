import { API_URL } from '@/config/api.config'

export const getAudioUrl = (audio: string | null): string | null => (audio ? `${API_URL.files()}${audio}` : null)
