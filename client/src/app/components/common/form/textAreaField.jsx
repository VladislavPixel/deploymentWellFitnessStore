import React from "react"
import PropTypes from "prop-types"

const TextAreaField = ({
	name,
	label,
	placeholder,
	onChange,
	value,
	error
}) => {
	const handlerChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}
	return (
		<div className="textarea-container">
			<div className="textarea-container__line-label">
				<label htmlFor={name} className="textarea-container__label">
					{label}
				</label>
			</div>
			<textarea
				name={name}
				onChange={handlerChange}
				id={name}
				className={"textarea-container__target" + (error ? " error" : "")}
				placeholder={placeholder}
			></textarea>
			{error && <div className="textarea-container__error">{error}</div>}
		</div>
	)
}

TextAreaField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	value: PropTypes.any,
	onChange: PropTypes.func
}

export default React.memo(TextAreaField)
