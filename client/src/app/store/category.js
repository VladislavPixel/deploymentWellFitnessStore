import { createSlice } from "@reduxjs/toolkit"
import categoryService from "../services/category.service"
import sortData from "../utils/sort"
import configAuxiliary from "../configAuxiliary.json"
import { toast } from "react-toastify"

const initialState = {
	entities: [],
	isLoading: true,
	error: null
}

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		categoryRequested(state) {
			state.isLoading = true
		},
		categoryRequestRecived(state, action) {
			state.entities = action.payload
			state.isLoading = false
		},
		categoryRequestField(state, action) {
			state.error = `Category error: ${action.payload}`
			state.isLoading = false
		}
	}
})

const { actions, reducer: categoryReducer } = categorySlice
const { categoryRequested, categoryRequestRecived, categoryRequestField } =
	actions

// Actions
export function fatchAllCategoryData() {
	return async (dispatch) => {
		dispatch(categoryRequested())
		try {
			const { content } = await categoryService.fetchAll()
			sortData(content, configAuxiliary.configSortedCategory)
			dispatch(categoryRequestRecived(content))
		} catch (err) {
			categoryRequestField(err.message)
			console.log("Expected error category...")
			toast.error(err.message)
			toast("Something wrong. Try all later.")
		}
	}
}

// Selectors
export function getStatusLoaderCategory() {
	return (state) => {
		return state.category.isLoading
	}
}
export function getCategoryData() {
	return (state) => {
		return state.category.entities
	}
}

export default categoryReducer
