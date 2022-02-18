import React from "react"
import PropTypes from "prop-types"

const ModalWindow = ({ isModal, children, backIcon, onBack, loadingState }) => {
	return (
		<div className={"modal-window" + (isModal ? " active" : "")}>
			<div className="modal-window__body">
				{backIcon && !loadingState && (
					<img
						className="modal-window__images"
						onClick={onBack}
						src="/img/modal/back.svg"
						alt="Иконка крестика"
					/>
				)}
				{children}
			</div>
		</div>
	)
}

ModalWindow.defaultProps = {
	backIcon: false
}

ModalWindow.propTypes = {
	isModal: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	backIcon: PropTypes.bool,
	onBack: PropTypes.func,
	loadingState: PropTypes.bool
}

export default ModalWindow
