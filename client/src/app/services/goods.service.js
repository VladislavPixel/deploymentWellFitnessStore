import httpService from "./http.service"

const goodsEndPoint = "good/"

const goodsService = {
	fatchAll: async () => {
		const { data } = await httpService.get(goodsEndPoint)
		return data
	},
	update: async (newData) => {
		const { data } = await httpService.patch(
			goodsEndPoint + newData._id,
			newData
		)
		return data
	},
	delete: async (id) => {
		const { data } = await httpService.delete(goodsEndPoint + id)
		return data
	},
	create: async (body) => {
		const { data } = await httpService.post(goodsEndPoint, body)
		return data
	},
	uploadFile: async (body) => {
		const { data } = await httpService.post("good/upload/", body)
		return data
	}
}

export default goodsService
