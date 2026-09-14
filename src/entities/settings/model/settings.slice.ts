import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const SOUND_STORAGE_KEY = 'engine_sound_enabled'

function readSoundEnabledFromStorage(): boolean {
	if (typeof window === 'undefined') return true

	const stored = window.localStorage.getItem(SOUND_STORAGE_KEY)
	return stored === null ? true : stored === 'true'
}

function persistSoundEnabled(value: boolean) {
	if (typeof window === 'undefined') return
	window.localStorage.setItem(SOUND_STORAGE_KEY, String(value))
}

interface SettingsState {
	soundEnabled: boolean
}

const initialState: SettingsState = {
	soundEnabled: readSoundEnabledFromStorage(),
}

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSoundEnabled: (state, action: PayloadAction<boolean>) => {
			state.soundEnabled = action.payload
			persistSoundEnabled(action.payload)
		},
		toggleSoundEnabled: state => {
			state.soundEnabled = !state.soundEnabled
			persistSoundEnabled(state.soundEnabled)
		},
		hydrateSoundEnabledFromProfile: (state, action: PayloadAction<boolean>) => {
			state.soundEnabled = action.payload
			persistSoundEnabled(action.payload)
		},
	},
})

export const { setSoundEnabled, toggleSoundEnabled, hydrateSoundEnabledFromProfile } = settingsSlice.actions
export default settingsSlice.reducer
