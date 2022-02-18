function doubleFilter(state1, state2, data) {
	if (state1 && state1.name !== "Все бренды" && state2) {
		return data
			.filter((item) => item.categoryHead === state1.name)
			.filter((element) => element.categorySubject === state2.name)
	} else if (state1 && state1.name !== "Все бренды") {
		return data.filter((item) => item.categoryHead === state1.name)
	} else if (state2) {
		return data.filter((item) => item.categorySubject === state2.name)
	} else {
		return data
	}
}

export default doubleFilter
