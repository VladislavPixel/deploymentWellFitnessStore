function getDate() {
	const objectDate = new Date()
	const date = objectDate.getDate()
	const month = objectDate.getMonth() + 1
	return `${date < 10 ? "0" + date : date}.${
		month < 10 ? "0" + month : month
	}.${objectDate.getFullYear()}`
}

export default getDate
