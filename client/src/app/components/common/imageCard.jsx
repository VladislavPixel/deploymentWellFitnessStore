import React from "react"
import PropTypes from "prop-types"
import ImageLink from "./imageLink"

const ImageCard = ({ imagesPath, name, to }) => {
	return (
		<div className="image-card">
			<ImageLink
				classes="image-card__img"
				to={to}
				pathImage={imagesPath}
				alt={`Товар: ${name}`}
			/>
		</div>
	)
}

ImageCard.propTypes = {
	imagesPath: PropTypes.string,
	name: PropTypes.string,
	to: PropTypes.string
}

export default ImageCard
