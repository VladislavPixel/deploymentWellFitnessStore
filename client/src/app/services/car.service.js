import httpService from "./http.service"

const carEndPoint = "car/"

const carService = {
	fetchAll: async (currentUser) => {
		const { data } = await httpService.get(carEndPoint, {
			params: {
				orderBy: "currentUser",
				equalTo: `${currentUser._id}`
			}
		})
		return data
	},
	push: async (newData) => {
		const { data } = await httpService.post(carEndPoint, newData)
		return data
	},
	deleteElement: async (id) => {
		const { data } = await httpService.delete(carEndPoint + (id || ""))
		return data
	}
}

export default carService
