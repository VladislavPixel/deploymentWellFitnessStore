import React from "react"
import Brand from "./brand"
import PropTypes from "prop-types"

const BrandsList = ({ brands }) => {
	return (
		<div className="brands__row">
			{brands.map((item) => (
				<Brand key={item._id} {...item} />
			))}
		</div>
	)
}

BrandsList.propTypes = {
	brands: PropTypes.array
}

export default BrandsList
