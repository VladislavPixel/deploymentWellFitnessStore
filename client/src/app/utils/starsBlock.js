function initializationStarsBlock() {
	const arrayColumn = [...document.querySelectorAll(".our-stars__column")]
	for (let i = 0; i < arrayColumn.length; i++) {
		arrayColumn[i].addEventListener("click", (e) => {
			for (let z = 0; z < arrayColumn.length; z++) {
				arrayColumn[z].classList.remove("active")
			}
			arrayColumn[i].classList.add("active")
		})
	}
}

export default initializationStarsBlock
