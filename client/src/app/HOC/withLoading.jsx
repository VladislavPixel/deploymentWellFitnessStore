import React from "react"
import PropTypes from "prop-types"
import Spinner from "../components/common/spinner"

const withLoading = (Component, statusLoading, configSpinner) => {
	const typeElement = typeof Component
	return function wrapLoading(props) {
		return (
			(statusLoading && (
				<div style={{ flex: "1 1 auto" }}>
					<Spinner {...configSpinner} />
				</div>
			)) ||
			(typeElement === "function" ? <Component {...props} /> : Component)
		)
	}
}

withLoading.propTypes = {
	Component: PropTypes.func,
	statusLoading: PropTypes.bool,
	configSpinner: PropTypes.object
}

export default withLoading
