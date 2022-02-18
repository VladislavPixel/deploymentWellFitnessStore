import React from "react"
import PropTypes from "prop-types"

const AdminPanelLeftBlock = ({
	suffix,
	specialClass,
	children,
	textTitle,
	additional
}) => {
	return (
		<React.Fragment>
			<h2 className="chief-sub-title admin-panel__title">{textTitle}</h2>
			{additional && additional}
			<div className={`admin-panel__${suffix} ${specialClass}`}>{children}</div>
		</React.Fragment>
	)
}

AdminPanelLeftBlock.propTypes = {
	suffix: PropTypes.string,
	specialClass: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	textTitle: PropTypes.string,
	additional: PropTypes.object
}

export default AdminPanelLeftBlock
