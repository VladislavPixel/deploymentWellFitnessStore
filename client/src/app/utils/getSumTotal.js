function getSumTotal(array) {
	if (array.length === 0) return 0
	if (array.length < 2) return array[0].count * array[0].price
	const finishedSum = array.reduce((accumulator, item) => {
		const sumItem = item.count * item.price
		return accumulator + sumItem
	}, 0)
	return finishedSum
}

export default getSumTotal
