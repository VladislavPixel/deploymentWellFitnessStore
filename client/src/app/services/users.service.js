import httpService from "./http.service"
import { getLocalId } from "./localStorage.service"

const endPointUsers = "user/"

const userService = {
	getUserOnId: async () => {
		const { data } = await httpService.get(endPointUsers + getLocalId())
		return data
	},
	recoveryPassword: async (payload) => {
		const { data } = await httpService.post(endPointUsers, payload)
		return data
	},
	update: async (payload) => {
		const { data } = await httpService.patch(
			endPointUsers + getLocalId(),
			payload
		)
		return data
	}
}

export default userService
