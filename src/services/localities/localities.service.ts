import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import type { Locality } from '@/shared/types/types'

class LocalitiesService {
	async getAllLocalities(districtId?: number | null) {
    const {data} = await axiosClassic<{ data: Locality[] }>({
        url: API_URL.localities(),
        method: 'GET',
        params: districtId && districtId > 0 ? { district_id: districtId } : {}
    })
	console.log('localities', data)
    return data
}
}

export const localitiesService = new LocalitiesService()
