import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import validator from "../../../utils/validator"

const FormComponent = ({
	children,
	config,
	dataDefault,
	onSubmit,
	...rest
}) => {
	const [data, setData] = useState(dataDefault || {})
	const [errorObject, setErrorObject] = useState({})
	const validate = useCallback(
		(data) => {
			const error = validator(data, config)
			setErrorObject(error)
			return Object.keys(error).length === 0
		},
		[config, setErrorObject]
	)
	const handlerChange = useCallback(
		(dataObject) => {
			setData((prevState) => {
				return { ...prevState, [dataObject.name]: dataObject.value }
			})
		},
		[setData]
	)
	const handlerSubmit = async (event) => {
		event.preventDefault()
		const isValid = validate()
		if (!isValid) {
			return
		}
		try {
			await onSubmit(data)
		} catch (error) {
			setErrorObject(error)
		}
	}
	const isValidBtn = Object.keys(errorObject).length === 0
	const newChildren = React.Children.map(children, (child) => {
		let config
		if (child) {
			if (typeof child.type === "object") {
				config = {
					...child.props,
					onChange: handlerChange,
					value: data[child.props.name],
					error: errorObject[child.props.name]
				}
			}
			if (child.type === "button") {
				if (child.props.type === "submit" || child.props.type === undefined) {
					config = {
						...child.props,
						disabled: !isValidBtn,
						onSubmit: handlerSubmit,
						className: !isValidBtn
							? child.props.className + " active"
							: child.props.className
					}
				}
			}
			return React.cloneElement(child, config)
		}
	})
	useEffect(() => {
		validate(data)
	}, [data, validate])
	useEffect(() => {
		setData(dataDefault)
	}, [dataDefault])
	return (
		<form onSubmit={handlerSubmit} {...rest}>
			{newChildren}
		</form>
	)
}

FormComponent.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	config: PropTypes.object,
	dataDefault: PropTypes.object,
	onSubmit: PropTypes.func
}

export default FormComponent
