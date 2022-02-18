import { createAction, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import goodsService from "../services/goods.service"

const initialState = {
	entities: [],
	isLoading: true,
	error: null
}

const goodsSlice = createSlice({
	name: "goods",
	initialState,
	reducers: {
		goodsRequested(state) {
			state.isLoading = true
			state.error = null
		},
		goodsRequestRecived(state, action) {
			state.entities = action.payload
			state.isLoading = false
		},
		goodsRequestField(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		goodsUpdatedGood(state, action) {
			const index = state.entities.findIndex(
				(item) => item._id === action.payload._id
			)
			state.entities[index] = action.payload
		},
		goodsDeletedGood(state, action) {
			const newArray = [...state.entities]
			state.entities = newArray.filter((el) => el._id !== action.payload)
		},
		goodsCreatedGood(state, action) {
			state.entities.push(action.payload)
		},
		goodsCreateCoincident(state, action) {
			state.error = action.payload
		},
		createGoodRequested(state) {
			state.error = null
		},
		deleteGoodRequested(state) {
			state.error = null
		},
		updateGoodRequested(state) {
			state.error = null
		},
		createGoodRequestField(state, action) {
			state.error = action.payload
		},
		updateGoodRequestField(state, action) {
			state.error = action.payload
		}
	}
})

const { actions, reducer: goodsReducer } = goodsSlice
const {
	updateGoodRequested,
	updateGoodRequestField,
	createGoodRequestField,
	deleteGoodRequested,
	createGoodRequested,
	goodsCreateCoincident,
	goodsCreatedGood,
	goodsRequested,
	goodsUpdatedGood,
	goodsRequestRecived,
	goodsRequestField,
	goodsDeletedGood
} = actions

const deleteGoodRequestField = createAction("goods/deleteGoodRequestField")

// Actions
export function createGood(newData) {
	return async (dispatch, getState) => {
		dispatch(createGoodRequested())
		try {
			const coincidentObjectByName = getState().goods.entities.find(
				(element) => element.name === newData.name
			)
			const coincidentObjectByImagesPath = getState().goods.entities.find(
				(element) => element.imagesPath === newData.imagesPath
			)
			if (coincidentObjectByName || coincidentObjectByImagesPath) {
				const errorCoincident = {
					response: {
						data: {
							error: {
								message:
									(coincidentObjectByName && "COINCIDENT_NAME") ||
									(coincidentObjectByImagesPath && "COINCIDENT_IMAGESPATH"),
								code: 400
							}
						}
					}
				}
				throw errorCoincident
			} else {
				// Отправил новый товар на сервер, если все валидации пройдут, он сохранится в базу
				const { content } = await goodsService.create(newData)
				// Формирую и отправляю картинку на сохранение
				const dataForm = new FormData()
				dataForm.append("imageFile", newData.imageFile.oldValueFiles[0])
				const fileInfo = await goodsService.uploadFile(dataForm)
				// Добавляю к товару путь его картинки
				content.pathServerImage = fileInfo.content.path
				const fullDataGood = await goodsService.update(content)
				dispatch(goodsCreatedGood(fullDataGood.content))
			}
		} catch (err) {
			const { code, message } = err?.response?.data?.error
			if (code === 400) {
				if (message === "COINCIDENT_NAME") {
					dispatch(goodsCreateCoincident("Товар с таким названием существует!"))
				} else if (message === "COINCIDENT_IMAGESPATH") {
					dispatch(
						createGoodRequestField(
							"Товар с таким путем картинки уже существует!"
						)
					)
				} else {
					dispatch(createGoodRequestField(message))
				}
			} else {
				dispatch(createGoodRequestField(err.message))
			}
		}
	}
}
export function deleteGood(id) {
	return async (dispatch) => {
		dispatch(deleteGoodRequested())
		try {
			await goodsService.delete(id)
			dispatch(goodsDeletedGood(id))
		} catch (err) {
			dispatch(deleteGoodRequestField())
		}
	}
}
export function fetchAllGoodsData() {
	return async (dispatch) => {
		dispatch(goodsRequested())
		try {
			const { content } = await goodsService.fatchAll()
			dispatch(goodsRequestRecived(content))
		} catch (err) {
			dispatch(goodsRequestField(err.message))
			console.log("Expected Error goods...")
			toast.error(err.message)
			toast("Something wrong. Try all later.")
		}
	}
}
export function updateGood(newData) {
	return async (dispatch) => {
		dispatch(updateGoodRequested())
		try {
			const { content } = await goodsService.update(newData)
			dispatch(goodsUpdatedGood(content))
		} catch (err) {
			const { code, message } = err?.response?.data?.error
			if (code === 400) {
				if (message === "COINCIDENT_NAME") {
					dispatch(
						updateGoodRequestField("Товар с таким названием уже существует!")
					)
				} else if (message === "COINCIDENT_IMAGESPATH") {
					dispatch(
						updateGoodRequestField(
							"Товар с таким путем картинки уже существует!"
						)
					)
				} else {
					dispatch(updateGoodRequestField(message))
				}
			} else {
				dispatch(updateGoodRequestField(err.message))
			}
		}
	}
}

// Selectors
export function getStatusLoaderGoods() {
	return (state) => {
		return state.goods.isLoading
	}
}
export function getGoodsData() {
	return (state) => {
		return state.goods.entities
	}
}
export function getGood(id) {
	return (state) => {
		return state.goods.entities.find((item) => item._id === id)
	}
}
export function getErrorGood() {
	return (state) => {
		return state.goods.error
	}
}

export default goodsReducer
