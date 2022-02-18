import React from "react"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import FormComponent from "./form"

const AccesLayotsBox = ({
	title,
	path,
	message,
	labelBtn,
	config,
	dataDefault,
	children,
	onSubmit,
	isLogin,
	messageRecovery,
	pathRecovery,
	labelBtnRecovery,
	recoveryPhrase
}) => {
	return (
		<div className="login-layot-box">
			<div className="login-layot-box__container">
				{title && <h2 className="login-layot-box__title">{title}</h2>}
				{recoveryPhrase && (
					<p className="login-layot-box__sub-title">{recoveryPhrase}</p>
				)}
				<div className="login-layot-box__block">
					<FormComponent
						config={config}
						dataDefault={dataDefault}
						onSubmit={onSubmit}
					>
						{children}
					</FormComponent>
					<div className="login-layot-box__sub-form">
						{message}
						{path && (
							<NavLink className="login-layot-box__toggle" to={path}>
								{labelBtn}
							</NavLink>
						)}
					</div>
					{isLogin && (
						<div className="login-layot-box__sub-form login-layot-box__sub-form_recovery">
							{messageRecovery}
							<NavLink className="login-layot-box__toggle" to={pathRecovery}>
								{labelBtnRecovery}
							</NavLink>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

AccesLayotsBox.propTypes = {
	title: PropTypes.string,
	path: PropTypes.string,
	message: PropTypes.string,
	labelBtn: PropTypes.string,
	config: PropTypes.object,
	dataDefault: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	onSubmit: PropTypes.func,
	isLogin: PropTypes.bool,
	messageRecovery: PropTypes.string,
	pathRecovery: PropTypes.string,
	labelBtnRecovery: PropTypes.string,
	recoveryPhrase: PropTypes.string
}

export default AccesLayotsBox
