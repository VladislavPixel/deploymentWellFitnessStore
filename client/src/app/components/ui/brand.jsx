import React from "react"
import PropTypes from "prop-types"

const Brand = ({ imagesPath, name }) => {
	return (
		<div className="brands__column">
			<div className="brands__images">
				<img src={`/img/brands/${imagesPath}`} alt={name} />
			</div>
		</div>
	)
}

Brand.propTypes = {
	imagesPath: PropTypes.string,
	name: PropTypes.string
}

export default Brand
