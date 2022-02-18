import httpService from "./http.service"

const purchaseBoxEndPoint = "purchaseBox/"

const purchaseBoxService = {
	create: async (body) => {
		const { data } = await httpService.post(purchaseBoxEndPoint, body)
		return data
	},
	fetchAll: async () => {
		const { data } = await httpService.get(purchaseBoxEndPoint)
		return data
	},
	delete: async (id) => {
		const { data } = await httpService.delete(purchaseBoxEndPoint + id)
		return data
	}
}

export default purchaseBoxService
