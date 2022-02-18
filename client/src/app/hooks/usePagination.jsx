const usePagination = (lengthPages, currentPage) => {
	const trigger1 = (lengthPages > 1) && (currentPage === 1) && true
	const isPrevArrow = !trigger1 || false
	const trigger2 = (lengthPages > 1) && (lengthPages === currentPage) && true
	const isNextArrow = !trigger2 || false
	const arrayPagins = []
	for (let i = 0; i < lengthPages; i++) {
		const z = i + 1
		arrayPagins.push({ _id: z, value: z })
	}
	function getPagins(allPage, array, current) {
		const MAX_COUNT_PAGE = 6
		if (allPage > MAX_COUNT_PAGE) {
			const delimiter = { _id: "delimiter", value: "..." }
			const penultIndex = array.length - 2
			if (current < 4) {
				return [
					...array.slice(0, 4),
					delimiter,
					array[penultIndex],
					array[array.length - 1]
				]
			}
			const filteredArray = array.filter(
				(item, index) => index >= current - 1 && index < penultIndex
			)
			function getArray(mode) {
				if (mode === "more") {
					const intermediateArray = array.slice(current - 1, penultIndex)
					return (
						(intermediateArray.length > 3 && intermediateArray.slice(0, 3)) ||
						intermediateArray
					)
				}
				if (mode === "less") {
					return array.filter(
						(el, index) => index >= array.length - 5 && index < penultIndex
					)
				}
			}
			const newArray =
				filteredArray.length > 3 ? getArray("more") : getArray("less")
			return [
				array[0],
				delimiter,
				...newArray,
				array[penultIndex],
				array[array.length - 1]
			]
		}
		return array
	}
	const config = {
		isPrev: isPrevArrow,
		isNext: isNextArrow,
		stateArrayPagins: getPagins(lengthPages, arrayPagins, currentPage)
	}
	return config
}

export default usePagination
