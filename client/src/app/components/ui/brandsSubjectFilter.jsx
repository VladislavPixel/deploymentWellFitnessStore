import React from "react"
import PropTypes from "prop-types"
import UniversalButton from "../common/universalButton"

const BrandsSubjectFilter = ({
	subjectCategory,
	onUpdate,
	currentCategory
}) => {
	return (
		<div className="brands__subject-filter">
			{subjectCategory.map((item) => (
				<UniversalButton
					data={item}
					isHandOver={true}
					onMethod={onUpdate}
					key={item._id}
					text={item.name}
					specificalClass={
						"brands__subject-btn" +
						(currentCategory?._id === item._id ? " active" : "")
					}
				/>
			))}
		</div>
	)
}

BrandsSubjectFilter.propTypes = {
	subjectCategory: PropTypes.array,
	onUpdate: PropTypes.func,
	currentCategory: PropTypes.object
}

export default BrandsSubjectFilter
