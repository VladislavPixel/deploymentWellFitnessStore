import React from "react"
import { Route, Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { getCurrentUserState } from "../../store/user"

/* eslint react/prop-types: 0 */
const ProtectedRoute = ({ path, component: Component, ...rest }) => {
	const currentUser = useSelector(getCurrentUserState())
	return (
		<Route
			path={path}
			{...rest}
			render={(props) => {
				if (currentUser) {
					if (currentUser.isAdmin && path === "/car") {
						return <Redirect to="/home" />
					}
					return <Component {...props} />
				}
				return (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location.pathname }
						}}
					/>
				)
			}}
		/>
	)
}

ProtectedRoute.propTypes = {
	component: PropTypes.func,
	rest: PropTypes.object,
	path: PropTypes.string
}

export default ProtectedRoute
