import React from "react"
import PropTypes from "prop-types"
import Message from "../components/common/message"

const withMessage = (Component, config, controlValue, stateMessage) => {
	// controlValue может принимать значения undefinde (элемент не найден), number (длина массива до/после фильтров),
	// null, когда нас не интересует это значение его нет и мы работаем на прямую со стейтом сообщения модального
	let isTrue
	if (controlValue === null) {
		isTrue = stateMessage
	} else {
		isTrue = !controlValue || Boolean(stateMessage)
	}
	return function wrapMessage(props) {
		return (isTrue && <Message {...config} />) || <Component {...props} />
	}
}

withMessage.propTypes = {
	Component: PropTypes.func,
	config: PropTypes.object,
	controlValue: PropTypes.any,
	stateMessage: PropTypes.any
}

export default withMessage
