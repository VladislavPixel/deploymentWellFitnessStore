function showElementsNumber() {
	const dItems = document.querySelectorAll(".element__number") // получаем все элементы с числом
	if (dItems.length > 0) {
		function dItemsAnimate(item, start, end, duration) {
			const range = end - start // получаем разность
			const MIN_TIMER = 50 // минимальный duration при котором мы видим смену чисел
			let stepTime = Math.abs(Math.floor(duration / range)) // высчитываем шаг duration
			stepTime = Math.max(stepTime, MIN_TIMER) // если шаг меньше минимального таймера, то возьмется больший, видимый для глаза
			const startTime = new Date().getTime() // Получаем текущее время в данный момент
			const endTime = startTime + duration // Получаем конечное время(к стартовому прибавляем duration за который анимация пройдет)
			const timer = setInterval(run, stepTime)
			function run() {
				const now = new Date().getTime() // Для повтора, так как идет счетчик каждый раз получаем текущее время в определенный момент
				const remaining = Math.max((endTime - now) / duration, 0)
				const value = Math.round(end - remaining * range)
				item.innerHTML = value // вывод шага в html
				if (value === end) {
					clearInterval(timer)
				}
			}
			run()
		}
		function initDigiItems() {
			const callback = function (entries, observer) {
				entries.forEach((item) => {
					// в entries callback ловит все наши объекты
					const el = item.target // получаем конкретный
					const digi = parseInt(el.innerHTML.replace(" ", "")) // получаем их значение
					if (item.isIntersecting) {
						// если объект в поле видимости то, запускаем функцию и снимаем слежку
						dItemsAnimate(el, 0, digi, 2000)
						observer.unobserve(el)
					}
				})
			}
			const observer = new IntersectionObserver(callback, {
				// создаем в const этот метод, подключаем и запускаем callback
				threshold: 1 // когда искомый объект полностью показан в экране сработает callback
			})
			dItems.forEach((item) => {
				observer.observe(item) // мы говорим отслеживать именно наши числа
			})
		}
		initDigiItems()
	}
}

export default showElementsNumber
