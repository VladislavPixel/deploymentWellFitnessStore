import axios from "axios"
import { getRefreshToken } from "./localStorage.service"
import config from "../config.json"

// baseURL: "https://identitytoolkit.googleapis.com/v1/",
// 	params: {
// 		key: process.env.REACT_APP_WEB_API_KEY
// 	}
// instance auth действует и для update Refresh Token

export const authInstance = axios.create({
	baseURL: config.endPointForApi + "auth/"
})

const authService = {
	signUp: async (payload) => {
		const data = await authInstance.post("signUp", payload)
		return data
	},
	signIn: async (payload) => {
		const data = await authInstance.post("signInWithPassword", payload)
		return data
	},
	doRefreshToken: async () => {
		const { data } = await authInstance.post("token", {
			refresh_token: getRefreshToken()
		})
		return data
	}
}

export default authService
