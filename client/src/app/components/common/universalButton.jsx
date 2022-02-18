import React from "react"
import PropTypes from "prop-types"

const UniversalButton = ({
	onMethod,
	specificalClass,
	type,
	text,
	data,
	isHandOver,
	sortedState
}) => {
	const isTarget = data?.path === sortedState?.path
	function createIcon() {
		if (sortedState?.order === "asc") {
			return (
				<img
					src="/img/sortLine/sort-up.svg"
					alt="Стрелка вверх"
					className="sort-container__icon"
				/>
			)
		}
		return (
			<img
				src="/img/sortLine/sort-down.svg"
				alt="Стрелка вниз"
				className="sort-container__icon"
			/>
		)
	}
	return (
		<button
			onClick={
				isHandOver
					? () => {
						sortedState
							? onMethod(sortedState.order, data.path)
							: onMethod(data)
					}
					: () => {
						onMethod()
					}
			}
			type={type}
			className={`${specificalClass}${isTarget ? " sort-active" : ""}`}
		>
			{isTarget && sortedState && createIcon()}
			{text}
		</button>
	)
}

UniversalButton.defaultProps = {
	type: "button"
}

UniversalButton.propTypes = {
	specificalClass: PropTypes.string,
	onMethod: PropTypes.func,
	text: PropTypes.string,
	type: PropTypes.string,
	isHandOver: PropTypes.bool,
	data: PropTypes.any,
	sortedState: PropTypes.object
}

export default UniversalButton
