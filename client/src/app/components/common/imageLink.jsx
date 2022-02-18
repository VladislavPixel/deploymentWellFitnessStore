import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const ImageLink = ({ classes, pathImage, to, alt }) => {
	return (
		<Link to={to} className={classes}>
			<img src={pathImage} alt={alt} />
		</Link>
	)
}

ImageLink.defaultProps = {
	classes: "header__logo",
	pathImage: "/img/header/logo.png",
	alt: "Логотип магазина WellFitness",
	to: "#"
}

ImageLink.propTypes = {
	classes: PropTypes.string,
	pathImage: PropTypes.string,
	to: PropTypes.string,
	alt: PropTypes.string
}

export default ImageLink
