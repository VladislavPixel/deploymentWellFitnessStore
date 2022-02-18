import React from "react"
import PropTypes from "prop-types"
import Header from "../components/ui/header"
import Footer from "../components/ui/footer"

const withWrapPage = (Component, configHeader, noHeader, noFooter) => {
	return function wrapPage(props) {
		return (
			<React.Fragment>
				{!noHeader && <Header {...configHeader} />}
				<div className="container-page">
					<Component {...props} />
				</div>
				{!noFooter && <Footer />}
			</React.Fragment>
		)
	}
}

withWrapPage.propTypes = {
	Component: PropTypes.func,
	configHeader: PropTypes.any,
	noHeader: PropTypes.bool,
	noFooter: PropTypes.bool
}

export default withWrapPage
