import httpService from "./http.service"

const supportEndPoint = "support/"

const supportService = {
	create: async (body) => {
		const { data } = await httpService.post(supportEndPoint, body)
		return data
	},
	fetchAll: async () => {
		const { data } = await httpService.get(supportEndPoint)
		return data
	},
	delete: async (id) => {
		const { data } = await httpService.delete(supportEndPoint + id)
		return data
	}
}

export default supportService
