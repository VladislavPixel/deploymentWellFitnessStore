import { createSlice } from "@reduxjs/toolkit"
import brandService from "../services/brands.service"

const initialState = {
	entities: [],
	isLoading: true,
	error: null
}

const brandSlice = createSlice({
	name: "brand",
	initialState,
	reducers: {
		brandRequested(state) {
			state.isLoading = true
		},
		brandRecived(state, action) {
			state.entities = action.payload
			state.isLoading = false
		},
		brandRequestField(state, action) {
			state.error = action.payload
			state.isLoading = false
		}
	}
})

const { actions, reducer: brandReducer } = brandSlice
const { brandRequested, brandRecived, brandRequestField } = actions

// Actions
export function fetchAllBrandData() {
	return async (dispatch) => {
		dispatch(brandRequested())
		try {
			const { content } = await brandService.fetchAll()
			dispatch(brandRecived(content))
		} catch (err) {
			dispatch(brandRequestField(err.message))
		}
	}
}

// Selectors
export function getStatusLoaderBrands() {
	return (state) => {
		return state.brand.isLoading
	}
}
export function getBrands() {
	return (state) => {
		return state.brand.entities
	}
}
export function getBrand(id) {
	return (state) => {
		return state.brand.entities.find((el) => el._id === id)
	}
}

export default brandReducer
