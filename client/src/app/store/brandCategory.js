import { createSlice } from "@reduxjs/toolkit"
import brandsCategoryService from "../services/brandsCategories.service"

const initialState = {
	entities: [],
	isLoading: true,
	error: null
}

const brandCategorySlice = createSlice({
	name: "brandCategory",
	initialState,
	reducers: {
		brandCategoryRequested(state) {
			state.isLoading = true
		},
		brandCategoryRecived(state, action) {
			state.entities = action.payload
			state.isLoading = false
		},
		brandCategoryRequestField(state, action) {
			state.error = action.payload
			state.isLoading = false
		}
	}
})

const { actions, reducer: brandCategoryReducer } = brandCategorySlice
const {
	brandCategoryRequested,
	brandCategoryRequestField,
	brandCategoryRecived
} = actions

// Actions
export function fetchAllBrandsCategory() {
	return async (dispatch) => {
		dispatch(brandCategoryRequested())
		try {
			const { content } = await brandsCategoryService.fetchAll()
			dispatch(brandCategoryRecived(content))
		} catch (err) {
			dispatch(brandCategoryRequestField(err.message))
		}
	}
}

// Selectors
export function getStatusLoaderBrandsCategory() {
	return (state) => {
		return state.brandCategory.isLoading
	}
}
export function getBrandsCategoryData() {
	return (state) => {
		return state.brandCategory.entities
	}
}

export default brandCategoryReducer
