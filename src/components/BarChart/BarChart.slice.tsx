import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentPage: 0,
}

const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		nextPage: state => {
			state.currentPage += 1
		},
		prevPage: state => {
			state.currentPage = Math.max(0, state.currentPage - 1)
		},
		setPage: (state, action) => {
			state.currentPage = action.payload
		},
	},
})

export const { nextPage, prevPage, setPage } = paginationSlice.actions
export default paginationSlice.reducer
