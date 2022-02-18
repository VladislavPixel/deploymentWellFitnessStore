import React from "react"
import PropTypes from "prop-types"

const QuantityController = ({
	onDecrement,
	onIncrement,
	delimiter,
	classes,
	isContent
}) => {
	return (
		<div className={classes}>
			<div className={`${classes}__point`} onClick={onDecrement}>
				{isContent && "-"}
			</div>
			<div className={`${classes}__delimiter`}>
				<span>{delimiter}</span>
			</div>
			<div
				className={`${classes}__point ${classes}__point_right`}
				onClick={onIncrement}
			>
				{isContent && "+"}
			</div>
		</div>
	)
}

QuantityController.defaultProps = {
	delimiter: "/",
	isContent: false
}

QuantityController.propTypes = {
	onDecrement: PropTypes.func,
	onIncrement: PropTypes.func,
	delimiter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	classes: PropTypes.string,
	isContent: PropTypes.bool
}

export default QuantityController
