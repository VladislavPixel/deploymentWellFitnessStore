import httpService from "./http.service"

const brandEndPoint = "brand/"

const brandService = {
	fetchAll: async () => {
		const { data } = await httpService.get(brandEndPoint)
		return data
	}
}

export default brandService
