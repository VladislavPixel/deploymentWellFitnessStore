import React from "react"
import PropTypes from "prop-types"
import ImageCard from "../common/imageCard"
import TextCard from "../common/textCard"
import CurrentGoodCard from "./currentGoodCard"
import config from "../../config.json"

const CurrentGood = ({ good, onSubmit }) => {
	return (
		<section className="current-good">
			<article className="current-good__column">
				<ImageCard
					imagesPath={`${
						config.endPoinForImage
					}${good.pathServerImage.replaceAll("\\", "/")}`}
					name={good.name}
				/>
				<TextCard description={good.description} />
			</article>
			<article className="current-good__column">
				<CurrentGoodCard {...good} onSubmit={onSubmit} />
			</article>
		</section>
	)
}

CurrentGood.propTypes = {
	good: PropTypes.object,
	onSubmit: PropTypes.func
}

export default CurrentGood
