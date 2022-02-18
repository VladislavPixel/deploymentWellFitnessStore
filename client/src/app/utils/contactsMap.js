import Balloon from "../iconsForScss/balloon.svg"

function initializationMap() {
	window.ymaps.ready(init)
	function init() {
		const myMap = new window.ymaps.Map("map", {
			center: [55.75322, 37.622513],
			zoom: 10,
			controls: ["zoomControl"]
		})
		const imagesBalloonConfig = {
			iconLayout: "default#image",
			iconImageHref: `${Balloon}`,
			iconImageSize: [36, 43]
		}
		function getBodyPlacemark(header, body, footer, content) {
			return {
				balloonContentHeader: `<h1 style="color: red; font-weight: bold">${header}</h1>`,
				balloonContentBody: `<div style="font-weight: bold">${body}</div>`,
				balloonContentFooter: footer,
				hintContent: content
			}
		}
		myMap.behaviors.disable("scrollZoom")
		const myPlacemark = new window.ymaps.Placemark(
			[55.79013, 37.380363],
			getBodyPlacemark(
				"Главный офис",
				"Режим работы 10:00 – 21:00. Адрес: г. Москва, ул. Маршала Прошлякова, д. 30",
				"8-905-327-23-18",
				"WellFitness офис"
			),
			imagesBalloonConfig
		)
		const myPlacemark2 = new window.ymaps.Placemark(
			[55.745534, 37.683051],
			getBodyPlacemark(
				"Основной магазин WellFitness",
				"Режим работы 10:00 – 21:00. Адрес: г. Москва, Международная улица, д. 12",
				"8-499-677-56-32",
				"Магазин в ТЦ Vegas"
			),
			imagesBalloonConfig
		)
		const myPlacemark3 = new window.ymaps.Placemark(
			[55.632916, 37.630975],
			getBodyPlacemark(
				"Дополнительный склад",
				"Режим работы 08:00 – 21:00. Адрес: г. Москва, Промышленная улица, д. 11А",
				"8-885-541-91-22",
				"Доп.store"
			),
			imagesBalloonConfig
		)
		const myPlacemark4 = new window.ymaps.Placemark(
			[55.802406, 37.30742],
			getBodyPlacemark(
				"Склад",
				"Режим работы 08:00 – 21:00. Адрес: МО, деревня Гольёво, 3А",
				"8-497-673-21-11",
				"Основной склад"
			),
			imagesBalloonConfig
		)
		myMap.geoObjects
			.add(myPlacemark)
			.add(myPlacemark2)
			.add(myPlacemark3)
			.add(myPlacemark4)
	}
}

export default initializationMap
