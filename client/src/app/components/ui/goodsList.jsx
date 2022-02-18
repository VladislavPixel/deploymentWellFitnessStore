import React from "react"
import Good from "./good"
import PropTypes from "prop-types"

const GoodsList = ({ goods }) => {
	return (
		<div className="goods-list-container">
			{goods.map((item) => (
				<Good key={item._id} {...item} />
			))}
		</div>
	)
}

GoodsList.propTypes = {
	goods: PropTypes.array
}

export default GoodsList
