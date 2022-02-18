import React from "react"
import configAuxiliary from "../../configAuxiliary.json"

const AboutUsWe = () => {
	const arrayMessageList = configAuxiliary.aboutUsWeList
	const arrayImagesPath = configAuxiliary.aboutUsWeImages
	return (
		<div className="about-us__we we-about">
			<h2 className="we-about__head chief-sub-title">Мы сегодня - это:</h2>
			<ul className="we-about__list">
				{arrayMessageList.map((item, index) => (
					<li key={index}>{item.message}</li>
				))}
			</ul>
			<div className="we-about__row">
				{arrayImagesPath.map((item, index) => {
					return (
						<div key={index} className="we-about__column">
							<div className="we-about__image-container">
								<img src={`/img/aboutUs/${item.imagesPath}`} alt={item.name} />
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default AboutUsWe
