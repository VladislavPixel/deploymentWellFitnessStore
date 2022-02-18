import React from "react"
import PropTypes from "prop-types"

const TextCard = ({ description }) => {
	return (
		<div className="text-card">
			<p className="text-card__content">{description}</p>
		</div>
	)
}

TextCard.propTypes = {
	description: PropTypes.string
}

export default TextCard
