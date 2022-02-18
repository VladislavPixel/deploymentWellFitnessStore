import React from "react"
import PropTypes from "prop-types"

const RadioField = ({ name, label, options, type, value, onChange }) => {
	const handlerChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}
	return (
		<React.Fragment>
			<label>{label}</label>
			<div className="radio-field__container">
				{options.map((item, index) => {
					return (
						<div key={index + item.value} className="radio-field__block">
							<input
								checked={(item.value === value && true) || false}
								id={item.value}
								type={type}
								value={item.value}
								name={name}
								onChange={handlerChange}
							/>
							<label htmlFor={item.value}>{item.label}</label>
						</div>
					)
				})}
			</div>
		</React.Fragment>
	)
}

RadioField.defaultProps = {
	type: "radio"
}

RadioField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
	type: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
}

export default React.memo(RadioField)
