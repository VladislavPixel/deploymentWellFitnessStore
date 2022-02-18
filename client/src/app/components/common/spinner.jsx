import React from "react"
import PropTypes from "prop-types"

const Spinner = ({ color1 }) => {
	return (
		<div className="spinner__wrapper">
			<div className={"lds-dual-ring" + (color1 ? " color1" : "")}></div>
		</div>
	)
}

Spinner.propTypes = {
	color1: PropTypes.string
}

export default Spinner
