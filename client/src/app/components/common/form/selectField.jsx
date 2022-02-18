import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Select from "react-select"

const SelectField = ({
	label,
	value,
	dataOptions,
	name,
	classesGlobal,
	error,
	placeholder,
	onChange
}) => {
	function getState(val, place) {
		if (val) return { value: { label: val, value: val } }
		return { placeholder: place }
	}
	const [valuePlace, setValuePlace] = useState(getState(value, placeholder))
	const arrayKeys = Object.keys(dataOptions[0])
	const newData =
		arrayKeys.length > 2
			? dataOptions.map((item) => ({ value: item.name, label: item.name }))
			: dataOptions
	const handlerChange = (event) => {
		onChange({ name: name, value: event.value })
	}
	useEffect(() => {
		setValuePlace(getState(value, placeholder))
	}, [value, placeholder])
	return (
		<div
			className={
				classesGlobal ? classesGlobal + (error ? " active" : "") : null
			}
		>
			<div className="select__label-container">
				<label htmlFor={name}>{label}</label>
			</div>
			<Select onChange={handlerChange} options={newData} {...valuePlace} />
			{error && <div className="select__error">{error}</div>}
		</div>
	)
}

SelectField.propTypes = {
	label: PropTypes.string,
	dataOptions: PropTypes.array,
	name: PropTypes.string,
	classesGlobal: PropTypes.string,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.any
}

export default React.memo(SelectField)
