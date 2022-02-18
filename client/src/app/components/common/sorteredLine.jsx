import React from "react"
import PropTypes from "prop-types"
import UniversalButton from "./universalButton"

const SorteredLine = ({ onUpdateSorted, sortedState, sorteredObject }) => {
	return (
		<div className="sort-container">
			{Object.keys(sorteredObject).map((key, index) => {
				return (
					<div key={index} className="sort-container__column">
						<UniversalButton
							sortedState={sortedState}
							data={sorteredObject[key]}
							isHandOver={true}
							onMethod={onUpdateSorted}
							specificalClass="universal-btn sort-container__btn"
							text={sorteredObject[key].name}
						/>
					</div>
				)
			})}
		</div>
	)
}

SorteredLine.propTypes = {
	onUpdateSorted: PropTypes.func,
	sortedState: PropTypes.object,
	sorteredObject: PropTypes.object
}

export default SorteredLine
