function getArrayDaysDuringWeek() {
	const arrayDate = []
	const currentDate = Date.now()
	function getStringDate(milliseconds) {
		const nextDate = new Date(milliseconds)
		return nextDate.toLocaleString("month", { month: "long", day: "numeric" })
	}
	for (let i = 1; i <= 7; i++) {
		arrayDate.push({
			value: getStringDate(86400000 * i + currentDate),
			label: getStringDate(86400000 * i + currentDate)
		})
	}
	return arrayDate
}

export default getArrayDaysDuringWeek
