import React from "react"
import PropTypes from "prop-types"

const Message = ({ pathImage, alt, title, offer, isWhite }) => {
	return (
		<div className="message">
			{pathImage && <img className="message__icon" src={pathImage} alt={alt} />}
			<h3 className={"message__title" + (isWhite ? " white-theme" : "")}>
				{title}
			</h3>
			<div className={"message__sub-title" + (isWhite ? " white-theme" : "")}>
				{offer}
			</div>
		</div>
	)
}

Message.defaultProps = {
	isWhite: false
}

Message.propTypes = {
	pathImage: PropTypes.string,
	alt: PropTypes.string,
	title: PropTypes.string,
	offer: PropTypes.string,
	isWhite: PropTypes.bool
}

export default Message
