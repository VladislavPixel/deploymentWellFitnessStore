import React, { useState } from "react"
import PropTypes from "prop-types"

const TextField = ({
	classes,
	name,
	label,
	placeholder,
	value,
	type,
	error,
	onChange,
	message,
	widthWindow,
	classesSearch,
	inputContainerClass,
	isPassword
}) => {
	const [searchInputState, setSearchInputState] = useState(false) // State Search
	const [passIcon, setPassIcon] = useState(false)
	const handlerChange = ({ target }) => {
		if (type === "number") {
			onChange({ name: target.name, value: Number(target.value) })
		} else {
			onChange({ name: target.name, value: target.value })
		}
	}
	const handlerClickPass = () => {
		setPassIcon(!passIcon)
	}
	const handlerClickLabelInput = () => {
		if (searchInputState) {
			setSearchInputState(false)
		} else {
			setSearchInputState(true)
		}
	}
	function getIconPass(state) {
		if (state) {
			return (
				<svg
					onClick={handlerClickPass}
					aria-hidden="true"
					focusable="false"
					data-prefix="fal"
					data-icon="eye-slash"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 640 512"
					className="password__svg svg-inline--fa fa-eye-slash fa-w-20 fa-2x"
				>
					<path
						fill="#ffffff"
						d="M637 485.25L23 1.75A8 8 0 0 0 11.76 3l-10 12.51A8 8 0 0 0 3 26.75l614 483.5a8 8 0 0 0 11.25-1.25l10-12.51a8 8 0 0 0-1.25-11.24zM320 96a128.14 128.14 0 0 1 128 128c0 21.62-5.9 41.69-15.4 59.57l25.45 20C471.65 280.09 480 253.14 480 224c0-36.83-12.91-70.31-33.78-97.33A294.88 294.88 0 0 1 576.05 256a299.73 299.73 0 0 1-67.77 87.16l25.32 19.94c28.47-26.28 52.87-57.26 70.93-92.51a32.35 32.35 0 0 0 0-29.19C550.3 135.59 442.94 64 320 64a311.23 311.23 0 0 0-130.12 28.43l45.77 36C258.24 108.52 287.56 96 320 96zm60.86 146.83A63.15 63.15 0 0 0 320 160c-1 0-1.89.24-2.85.29a45.11 45.11 0 0 1-.24 32.19zm-217.62-49.16A154.29 154.29 0 0 0 160 224a159.39 159.39 0 0 0 226.27 145.29L356.69 346c-11.7 3.53-23.85 6-36.68 6A128.15 128.15 0 0 1 192 224c0-2.44.59-4.72.72-7.12zM320 416c-107.36 0-205.47-61.31-256-160 17.43-34 41.09-62.72 68.31-86.72l-25.86-20.37c-28.48 26.28-52.87 57.25-70.93 92.5a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448a311.25 311.25 0 0 0 130.12-28.43l-29.25-23C389.06 408.84 355.15 416 320 416z"
						className=""
					></path>
				</svg>
			)
		}
		return (
			<svg
				onClick={handlerClickPass}
				aria-hidden="true"
				focusable="false"
				data-prefix="fal"
				data-icon="eye"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 576 512"
				className="password__svg svg-inline--fa fa-eye fa-w-18 fa-2x"
			>
				<path
					fill="#ffffff"
					d="M288 288a64 64 0 0 0 0-128c-1 0-1.88.24-2.85.29a47.5 47.5 0 0 1-60.86 60.86c0 1-.29 1.88-.29 2.85a64 64 0 0 0 64 64zm284.52-46.6C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 96a128 128 0 1 1-128 128A128.14 128.14 0 0 1 288 96zm0 320c-107.36 0-205.46-61.31-256-160a294.78 294.78 0 0 1 129.78-129.33C140.91 153.69 128 187.17 128 224a160 160 0 0 0 320 0c0-36.83-12.91-70.31-33.78-97.33A294.78 294.78 0 0 1 544 256c-50.53 98.69-148.64 160-256 160z"
					className=""
				></path>
			</svg>
		)
	}
	const passType = passIcon ? "text" : "password"
	const errorClass = error ? "error" : null
	const searchClasses = searchInputState || widthWindow <= 470 ? " active" : ""
	return (
		<div className={`${classes}${classesSearch}`}>
			<label
				htmlFor={name}
				onClick={classesSearch ? handlerClickLabelInput : null}
			>
				{label}
			</label>
			{message && <div className="text-field__message">{message}</div>}
			<div
				className={`text-field__input-container${inputContainerClass}${
					isPassword ? " flag" : ""
				}`}
			>
				<input
					className={`${errorClass}${searchClasses}`}
					type={type === "password" ? passType : type}
					onChange={handlerChange}
					name={name}
					value={value}
					id={name}
					placeholder={placeholder}
				/>
				{type === "password" && getIconPass(passIcon)}
			</div>
			{error && <div className="form-field__error">{error}</div>}
		</div>
	)
}

TextField.defaultProps = {
	type: "text",
	inputContainerClass: "",
	classes: "",
	classesSearch: ""
}
TextField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	placeholder: PropTypes.string,
	type: PropTypes.string,
	message: PropTypes.string,
	widthWindow: PropTypes.number,
	inputContainerClass: PropTypes.string,
	classesSearch: PropTypes.string,
	classes: PropTypes.string,
	isPassword: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	error: PropTypes.string,
	onChange: PropTypes.func
}

export default React.memo(TextField)
