import React, { useEffect } from "react"
import configAuxiliary from "../../configAuxiliary.json"
import initializationSwiperContacts from "../../utils/swiperContacts"

const ContactsSlider = () => {
	useEffect(() => {
		initializationSwiperContacts()
	}, [])
	return (
		<div className="head-block__slider slider-head-block swiper">
			<div className="slider-head-block__swiper-wrapper swiper-wrapper">
				{configAuxiliary.sliderContacts.map((element, index) => {
					return (
						<div key={index} className="slider-head-block__slide swiper-slide">
							<div className="slider-head-block__images">
								<img
									src={`/img/contacts/swiperImage/${element}`}
									alt="Картинка слайда Контактов"
								/>
							</div>
						</div>
					)
				})}
			</div>
			<div className="slider-head-block__btn-prev swiper-btn">
				<img src="/img/icons/arrow-red.svg" alt="Стрелка кнопки" />
			</div>
			<div className="slider-head-block__btn-next swiper-btn">
				<img src="/img/icons/arrow-red.svg" alt="Стрелка кнопки" />
			</div>
		</div>
	)
}

export default ContactsSlider
