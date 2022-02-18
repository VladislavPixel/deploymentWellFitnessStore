import React, { useEffect } from "react"
import AboutUsStartBlock from "./aboutUsStartBlock"
import AboutUsStatistics from "./aboutUsStatistics"
import showElementsNumber from "../../utils/showNumberElements"
import AboutUsGeography from "./aboutUsGeography"
import AboutUsWe from "./aboutUsWe"
import AboutUsWhat from "./aboutUsWhat"
import OurStars from "../common/ourStars"
import configAuxiliary from "../../configAuxiliary.json"

const AboutUsContainer = () => {
	useEffect(() => {
		showElementsNumber()
	})
	return (
		<div className="about-us _container">
			<h1 className="chief-title about-us__title">О компании</h1>
			<AboutUsStartBlock />
			<AboutUsStatistics />
			<AboutUsGeography />
			<AboutUsWe />
			<OurStars
				prePath="/img/aboutUs/stars/"
				data={configAuxiliary.aboutUsStars}
				title="Подписанные компанией WellFitness фитнес-модели"
			/>
			<AboutUsWhat />
		</div>
	)
}

export default AboutUsContainer
