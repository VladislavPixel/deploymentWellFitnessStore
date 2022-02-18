import httpService from "./http.service"

const brandsCategoriesEndPoint = "brandCategory/"

const brandsCategoryService = {
	fetchAll: async () => {
		const { data } = await httpService.get(brandsCategoriesEndPoint)
		return data
	}
}

export default brandsCategoryService
