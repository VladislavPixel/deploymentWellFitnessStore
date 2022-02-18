import axios from "axios"
import configApi from "../config.json"
import localStorageService from "./localStorage.service"
import authService from "./auth.service"

const http = axios.create({
	baseURL: configApi.endPointForApi
})

function sliceSlash(data) {
	return data.slice(0, -1)
}

http.interceptors.request.use(
	async (config) => {
		const refreshTokenAccess = localStorageService.getRefreshToken()
		const liveToken = Number(localStorageService.getLiveTimeToken())
		const idAccessToken = localStorageService.getIdToken()
		const isOverdue = refreshTokenAccess && liveToken < Date.now()
		if (configApi.isFirebase) {
			const regExpTestCorrectUrl = /\/$/gi.test(config.url)
			config.url =
				(regExpTestCorrectUrl ? sliceSlash(config.url) : config.url) + ".json"

			if (isOverdue) {
				const {
					expires_in: expiresIn,
					refresh_token: refreshToken,
					id_token: idToken,
					user_id: localId
				} = await authService.doRefreshToken()
				localStorageService.setToken({
					expiresIn,
					idToken,
					refreshToken,
					localId
				})
			}
			if (idAccessToken) {
				// instance http который имеет базовый url приложения также может использоваться и для аутентифицированных запросов
				config.params = { ...config.params, auth: idAccessToken }
			}
		} else {
			if (isOverdue) {
				const { expiresIn, refreshToken, accessToken, userId } =
					await authService.doRefreshToken()
				localStorageService.setToken({
					expiresIn,
					accessToken,
					refreshToken,
					userId
				})
			}
			if (idAccessToken) {
				config.headers = {
					...config.headers,
					Authorization: `Bearer ${idAccessToken}`
				}
			}
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

function getCorrectFormatData(data) {
	if (data !== null && data._id) return data
	return data ? Object.keys(data).map((key) => data[key]) : []
}

http.interceptors.response.use(
	(res) => {
		if (configApi.isFirebase) {
			res.data = { content: getCorrectFormatData(res.data) }
		}
		res.data = { content: res.data }
		return res
	},
	(error) => {
		return Promise.reject(error)
	}
)

const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	patch: http.patch,
	options: http.options,
	delete: http.delete
}

export default httpService
