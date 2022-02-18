import React, { useEffect } from "react"
import PropTypes from "prop-types"
import initializationSwiperBrand from "../../utils/swiperBrand"

const BrandSlider = ({ prefix, slides }) => {
	useEffect(() => {
		initializationSwiperBrand()
	}, [])
	return (
		<div className="brand__slider swiper">
			<div className="brand__wrapper-slider swiper-wrapper">
				{slides.map((item, index) => {
					return (
						<div key={index} className="brand__slide swiper-slide">
							<div className="brand__slider-img swiper__images">
								<img src={prefix + item} alt="Изображение слайда" />
							</div>
						</div>
					)
				})}
			</div>
			<div className="brand__btn-prev swiper-btn">
				<img src="/img/icons/arrow-red.svg" alt="Стрелка кнопки" />
			</div>
			<div className="brand__btn-next swiper-btn">
				<img src="/img/icons/arrow-red.svg" alt="Стрелка кнопки" />
			</div>
		</div>
	)
}

BrandSlider.propTypes = {
	prefix: PropTypes.string,
	slides: PropTypes.array
}

export default BrandSlider
