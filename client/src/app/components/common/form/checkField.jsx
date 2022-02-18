import React from "react"
import PropTypes from "prop-types"

const CheckField = ({ name, label, value, onChange, type, error }) => {
	const handlerChange = ({ target }) => {
		onChange({ name: target.name, value: target.checked })
	}
	return (
		<div>
			<div className="checkbox-fied__block">
				<input
					id={name}
					name={name}
					value={value}
					onChange={handlerChange}
					type={type}
				/>
				<label htmlFor={name}>{label}</label>
			</div>
			{error && <div className="form-field__error">{error}</div>}
		</div>
	)
}

CheckField.defaultProps = {
	type: "checkbox"
}

CheckField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.bool,
	onChange: PropTypes.func,
	type: PropTypes.string,
	error: PropTypes.string
}

export default React.memo(CheckField)
