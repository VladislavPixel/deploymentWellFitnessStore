import React from "react"
import PropTypes from "prop-types"
import UniversalButton from "../common/universalButton"

const BrandsHeadFilter = ({ category, onUpdate, currentCategory }) => {
	return (
		<div className="brands__filter">
			{category.map((item) => (
				<UniversalButton
					data={item}
					isHandOver={true}
					onMethod={onUpdate}
					key={item._id}
					specificalClass={
						"universal-btn brands__filter-element" +
						(currentCategory?.customId === item.customId ? " active" : "")
					}
					text={item.name}
				/>
			))}
		</div>
	)
}

BrandsHeadFilter.propTypes = {
	category: PropTypes.array,
	onUpdate: PropTypes.func,
	currentCategory: PropTypes.object
}

export default BrandsHeadFilter
