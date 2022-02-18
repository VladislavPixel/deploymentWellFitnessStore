import React from "react"
import PropTypes from "prop-types"

const IndicatorElement = ({ number, label, suffix }) => {
	return (
		<div className="indicators-row__column">
			<div className={"element__number" + (suffix ? " active" : "")}>
				{number}
			</div>
			<div className="indicators-row__label">{label}</div>
		</div>
	)
}

IndicatorElement.propTypes = {
	number: PropTypes.number,
	label: PropTypes.string,
	suffix: PropTypes.bool
}

export default IndicatorElement
