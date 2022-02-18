import httpService from "./http.service"

const brandsSubjectEndPoint = "brandSubject/"

const brandsSubjectService = {
	fetchAll: async () => {
		const { data } = await httpService.get(brandsSubjectEndPoint)
		return data
	}
}

export default brandsSubjectService
