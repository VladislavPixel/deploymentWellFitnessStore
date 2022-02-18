import React from "react"

const AboutUsStartBlock = () => {
	return (
		<div className="about-us__start-img-row start-img-row">
			<div className="start-img-row__column">
				<div className="start-img-row__block">
					<h2 className="start-img-row__title">
						<span>Well Fitness</span> — надежный партнер с 2005 года для сотен
						компаний от Калининграда до Владивостока.
					</h2>
				</div>
			</div>
			<div className="start-img-row__column">
				<div className="start-img-row__image">
					<img
						src="/img/aboutUs/storeWellFitness.png"
						alt="Магазин спортивных товаров Well-Fitness"
					/>
				</div>
			</div>
		</div>
	)
}

export default AboutUsStartBlock
