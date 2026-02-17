import axios from 'axios'

import { SERVER_URL } from '@/config/api.config'
// console.log('SERVER_URL', SERVER_URL)
const axiosClassic = axios.create({
	baseURL: SERVER_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export { axiosClassic }
