function initializationSLider() {
	const btnUp = document.querySelector(".welcome__up")
	const btnDown = document.querySelector(".welcome__down")
	const arrayImage = [...document.querySelectorAll(".welcome__image-container")]
	const arrayColor = [...document.querySelectorAll(".welcome__color-container")]
	const rightColumn = document.querySelector(".welcome__column_right")
	const leftColumn = document.querySelector(".welcome__column_left")
	let rightCount = arrayImage.length - 1
	let leftCount = 0
	showTransform(rightColumn, rightCount)

	function showTransform(element, value) {
		element.style.transform = "translateY(" + value * -100 + "%)"
	}
	btnUp.addEventListener("click", (e) => {
		leftCount--
		rightCount++
		if (rightCount >= arrayImage.length) {
			rightCount = 0
			leftCount = arrayColor.length - 1
		}
		showTransform(rightColumn, rightCount)
		showTransform(leftColumn, leftCount)
	})
	btnDown.addEventListener("click", (e) => {
		leftCount++
		rightCount--
		if (rightCount < 0) {
			rightCount = arrayImage.length - 1
			leftCount = 0
		}
		showTransform(rightColumn, rightCount)
		showTransform(leftColumn, leftCount)
	})
}

export default initializationSLider
