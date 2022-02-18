import React, { useEffect } from "react"
import PropTypes from "prop-types"
import FormComponent, { TextField, FileField, SelectField } from "../common/form"
import Spinner from "../common/spinner"
import UniversalButton from "../common/universalButton"
import { useSelector, useDispatch } from "react-redux"
import {
	getStatusLoaderCategory,
	getCategoryData,
	fatchAllCategoryData
} from "../../store/category"
import { getErrorGood } from "../../store/goods"
import configAuxiliary from "../../configAuxiliary.json"

const AdminPanelCreateGood = ({ good, stateMode, onUpdateMode, onSubmit }) => {
	const dispatch = useDispatch()
	const isLoading = useSelector(getStatusLoaderCategory())
	const category = useSelector(getCategoryData())
	const errorCreateGood = useSelector(getErrorGood())
	const configSchema = {
		name: {
			isRequired: { message: `Поле "Имя" должно быть обязательно заполнено...` }
		},
		price: {
			isRequired: {
				message: `Поле "Цена" должно быть обязательно заполнено...`
			},
			isNumber: { message: `Поле "Цена" должно состоять только из цифр...` },
			moreZiro: {
				message: `Поле "Цена" должно быть больше 0 и целым числом...`
			}
		},
		description: {
			isRequired: {
				message: `Поле "Описание" должно быть обязательно заполнено...`
			}
		},
		imagesPath: {
			isRequired: {
				message: `Поле "Путь для изображения" обязательно для заполнения...`
			},
			isImageFormat: {
				message:
					"Введенная строчка не является форматом изображения. Допустимые (.png .svg .jpg .jpeg)"
			}
		},
		category: {
			isRequired: { message: `Поле "Категория" обязательно для заполнения...` }
		},
		totalInStock: {
			isNumber: {
				message: `Поле "Количество на складе" должно состоять только из цифр...`
			}
		}
	}
	if (stateMode === "create") {
		configSchema.totalInStock.moreZiro = {
			message: `Нет смысла добавлять товар в БД, если его нет на складе...`
		}
		configSchema.totalInStock.isRequired = {
			message: `Поле "Количество на складе" обязательно для заполнения...`
		}
		configSchema.imageFile = {
			countElements: {
				message: `Поле "Выбора изображения" должно быть обязательно установлено, т.к. товар отображается с картинкой...`
			}
		}
	}
	const getMode = (state) => {
		if (state === "create") return "Добавления"
		if (state === "update") return "Редактирования"
	}
	const getTextSubmitBtn = (state) => {
		if (state === "create") return "Добавить"
		if (state === "update") return "Обновить"
	}
	useEffect(() => {
		if (isLoading && category.length <= 0) {
			dispatch(fatchAllCategoryData())
		}
	}, [dispatch, isLoading, category.length])
	const defaultData = stateMode === "create" ? { ...good, imageFile: [] } : good
	return (
		<div className="admin-panel__create-good admin-create">
			<h2 className="admin-create__title">
				Добавление / Редактирование товара
			</h2>
			<div className="admin-create__mode">
				Вы находитесь в режиме:{" "}
				<span className={stateMode === "create" ? "create" : "update"}>
					{getMode(stateMode)}
				</span>
			</div>
			<UniversalButton
				onMethod={onUpdateMode}
				specificalClass={
					"universal-btn admin-create__mode-btn" +
					(stateMode === "create" ? " active" : "")
				}
				text="Выйти из режима редактирования"
			/>
			{errorCreateGood && stateMode === "create" && (
				<div style={configAuxiliary.configStylesError}>{errorCreateGood}</div>
			)}
			{(isLoading && <Spinner />) || (
				<FormComponent
					dataDefault={defaultData}
					config={configSchema}
					onSubmit={onSubmit}
					encType="multipart/form-data"
				>
					<TextField
						classes="admin-create__field"
						name="name"
						label="Наименование:"
						placeholder="укажите наименование"
					/>
					<TextField
						classes="admin-create__field"
						type="number"
						name="price"
						label="Цена:"
						placeholder="укажите цену за штуку"
					/>
					<TextField
						classes="admin-create__field"
						name="imagesPath"
						label="Название картинки:"
						placeholder="название + разрешение"
					/>
					{stateMode === "create" && (
						<FileField
							classes="admin-create__field file-field"
							label="Выберите изображение для товара:"
							name="imageFile"
						/>
					)}
					<SelectField
						classes="admin-create__field"
						classesGlobal="admin-create__select"
						label="Категория:"
						name="category"
						placeholder="укажите категорию"
						dataOptions={category}
					/>
					<TextField
						classes="admin-create__field"
						name="description"
						label="Описание:"
						placeholder="информация о продукции"
					/>
					<TextField
						classes="admin-create__field"
						type="number"
						name="totalInStock"
						label="Количество на складе:"
						placeholder="кол-во на складе"
					/>
					<button className="universal-btn admin-create__submit">
						{getTextSubmitBtn(stateMode)}
					</button>
				</FormComponent>
			)}
		</div>
	)
}

AdminPanelCreateGood.propTypes = {
	good: PropTypes.object,
	stateMode: PropTypes.string,
	onUpdateMode: PropTypes.func,
	onSubmit: PropTypes.func
}

export default AdminPanelCreateGood
