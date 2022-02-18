import Swiper, { Navigation } from "swiper"

function initializationSwiperBrand() {
	Swiper.use([Navigation])
	/* eslint-disable no-new */
	new Swiper(".swiper", {
		observer: true,
		observeParents: true,
		speed: 950,
		spaceBetween: 20,
		slidesPerView: 3,
		loop: true,
		navigation: {
			nextEl: ".brand__btn-next",
			prevEl: ".brand__btn-prev"
		}
	})
}

export default initializationSwiperBrand
