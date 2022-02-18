import Swiper, { Navigation } from "swiper"

function initializationSwiperContacts() {
	Swiper.use([Navigation])
	/* eslint-disable no-new */
	new Swiper(".swiper", {
		observer: true,
		observeParents: true,
		speed: 950,
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: ".slider-head-block__btn-next",
			prevEl: ".slider-head-block__btn-prev"
		}
	})
}

export default initializationSwiperContacts
