function getCorrectYear(value) {
	if (value === 0 || value > 4) return value + " лет"
	if (value > 1 && value < 5) return value + " года"
	return value + " год"
}

export default getCorrectYear
