import React, { useState } from "react"
import PropTypes from "prop-types"
import bytesToSize from "../../../utils/bytesToSize"

const FileField = ({ classes, label, name, type, error, onChange }) => {
	const [filesStore, setFilesStore] = useState([])
	const [pfrase, setPfrase] = useState(false)
	const refInput = React.createRef()
	const [isOpen, setIsOpen] = useState(false)
	const showIcon = () => {
		if (!filesStore.length) {
			setPfrase(true)
			return
		}
		setIsOpen(!isOpen)
		setPfrase(false)
	}
	const getIcon = () => {
		if (isOpen) {
			return (
				<img
					onClick={showIcon}
					src="/img/icons/box-open.svg"
					alt="Иконка открытого сундука"
				/>
			)
		}
		if (!isOpen) {
			return (
				<img
					onClick={showIcon}
					src="/img/icons/box-close.svg"
					alt="Иконка закрытого сундука"
				/>
			)
		}
	}
	const handlerOpen = () => refInput.current.click()
	const handlerChange = (event) => {
		if (event.target === null) {
			onChange({
				name: name,
				value: event.value
			})
		} else {
			if (event.target.files.length === 0) return
			const arrayFiles = Array.from(event.target.files)
			const reader = new FileReader()
			const array = []
			const arrayPromises = arrayFiles.map(
				(file) =>
					new Promise((resolve, reject) => {
						if (!file.type.match("image")) return
						reader.onload = ({ target }) => {
							array.push({
								imageHash: target.result,
								size: bytesToSize(file.size),
								name: file.name
							})
							resolve()
						}
						reader.readAsDataURL(file)
					})
			)
			Promise.all(arrayPromises)
				.then(() => {
					setFilesStore(array)
					setPfrase(false)
					onChange({
						name: name,
						value: {
							newValueFiles: array,
							oldValueFiles: event.target.files
						}
					})
				})
				.catch((err) => {
					console.log("Возникла ошибка при чтении файлов FileReader", err)
				})
		}
	}
	const handlerDeleteFile = (indexFile) => {
		const newState = [...filesStore.filter((el, i) => i !== indexFile)]
		setFilesStore(newState)
		refInput.current.value = null
		if (newState.length === 0) setIsOpen(false)
		handlerChange({ target: null, value: newState })
	}
	return (
		<div className={classes}>
			<label>{label}</label>
			<div className="file-field__input-container">
				<input
					accept="image/jpeg,image/png,image/jpg,image/svg"
					onChange={handlerChange}
					ref={refInput}
					id={name}
					type={type}
					name={name}
				/>
				<button
					onClick={handlerOpen}
					type="button"
					className="file-field__btn-open"
				>
					Открыть
				</button>
				{getIcon()}
				{pfrase && <span>Сундук пуст!</span>}
			</div>
			{error && <div className="form-field__error">{error}</div>}
			<div className={`${classes}__storage${isOpen ? " active" : ""}`}>
				<img
					onClick={showIcon}
					className={`${classes}__icon-storage`}
					src="/img/icons/whiteArrow.svg"
					alt="Белая треугольная стрелка"
				/>
				<div className={`${classes}__files-block`}>
					{filesStore.map((file, index) => {
						return (
							<div className={`${classes}__file file-card`} key={index}>
								<div className="file-card__delete-block">
									<img
										onClick={() => {
											handlerDeleteFile(index)
										}}
										className="file-card__icon-cross"
										src="/img/icons/yellow-cross.svg"
										alt="Иконка-крестик"
									/>
								</div>
								<img
									className="file-card__image"
									src={file.imageHash}
									alt="Картинка предпросмотра, которую добавил админ для создания товара."
								/>
								<div className="file-card__info-size">{file.size}</div>
								<div className="file-card__info-name">{file.name}</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

FileField.defaultProps = {
	type: "file"
}

FileField.propTypes = {
	classes: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func
}

export default React.memo(FileField)
