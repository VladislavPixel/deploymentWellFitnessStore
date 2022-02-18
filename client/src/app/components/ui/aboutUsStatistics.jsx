import React from "react"
import configAuxiliary from "../../configAuxiliary.json"
import IndicatorElement from "./indicatorElement"

const AboutUsStatistics = () => {
	const arrayIndicators = configAuxiliary.aboutUsStatistics
	return (
		<div className="about-us__statistics">
			<div className="about-us__text">
				За годы успешного развития нам удалось консолидировать в своем
				ассортименте продукцию лучших мировых брендов, собрать команду
				профессионалов, завоевать доверие десятков тысяч лояльных покупателей и
				стать настоящим лидером рынка.
			</div>
			<div className="about-us__indicators indicators-row">
				{arrayIndicators.map((item, index) => (
					<IndicatorElement key={index} {...item} />
				))}
			</div>
		</div>
	)
}

export default AboutUsStatistics
