import React from "react"
import PropTypes from "prop-types"

const BrandSubHead = ({ message }) => {
	return (
		<div className="brand__sub-head sub-head">
			{message.map((text, index) => (
				<div key={index} className="sub-head__text">
					{text}
				</div>
			))}
		</div>
	)
}

BrandSubHead.propTypes = {
	message: PropTypes.array
}

export default BrandSubHead
