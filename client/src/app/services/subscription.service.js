import httpService from "./http.service"

const subscriptionEndPoint = "subscription/"

const subscriptionService = {
	create: async (body) => {
		const { data } = await httpService.post(subscriptionEndPoint, body)
		return data
	},
	fetchAll: async () => {
		const { data } = await httpService.get(subscriptionEndPoint)
		return data
	},
	delete: async (id) => {
		const { data } = await httpService.delete(subscriptionEndPoint + id)
		return data
	}
}

export default subscriptionService
