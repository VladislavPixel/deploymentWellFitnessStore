import { createSlice, createAction } from "@reduxjs/toolkit"
import supportService from "../services/support.service"

const initialState = {
	entities: [],
	isLoading: true,
	error: null
}

const supportSlice = createSlice({
	name: "support",
	initialState,
	reducers: {
		supportRequested(state) {
			state.isLoading = true
		},
		supportRecived(state, action) {
			state.entities = action.payload
			state.isLoading = false
		},
		supportRequestField(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		supportStopedLoader(state) {
			state.isLoading = false
		},
		supportDeletedElement(state, action) {
			const newArray = [...state.entities]
			state.entities = newArray.filter((el) => el._id !== action.payload)
		},
		supportCreateRequestField(state, action) {
			state.error = action.payload
		},
		supportRemovedError(state) {
			state.error = null
		}
	}
})

const { actions, reducer: supportReducer } = supportSlice
const {
	supportRequested,
	supportRemovedError,
	supportCreateRequestField,
	supportDeletedElement,
	supportStopedLoader,
	supportRecived,
	supportRequestField
} = actions

const supportCreateRequested = createAction("support/supportCreateRequested")
const supportDeleteRequested = createAction("support/supportDeleteRequested")
const supportDeleteRequestField = createAction(
	"support/supportDeleteRequestField"
)

// Actions
export function deleteSupportElement(id) {
	return async (dispatch) => {
		dispatch(supportDeleteRequested())
		try {
			await supportService.delete(id)
			dispatch(supportDeletedElement(id))
		} catch (err) {
			dispatch(supportDeleteRequestField(err.message))
		}
	}
}
export function fetchAllSupportData() {
	return async (dispatch) => {
		dispatch(supportRequested())
		try {
			const { content } = await supportService.fetchAll()
			dispatch(supportRecived(content))
		} catch (err) {
			dispatch(supportRequestField(err.message))
		}
	}
}
export function stopLoaderSupport() {
	return (dispatch) => {
		dispatch(supportStopedLoader())
	}
}
export function createSupport(body) {
	return async (dispatch) => {
		dispatch(supportCreateRequested())
		try {
			await supportService.create(body)
		} catch (err) {
			const { code, message } = err.response.data
			if (code === 500) {
				dispatch(supportCreateRequestField(message))
			} else {
				dispatch(supportCreateRequestField(err.message))
			}
			return true
		}
	}
}
export function removeErrorSupport() {
	return (dispatch) => {
		dispatch(supportRemovedError())
	}
}

// Selectors
export function getStatusLoaderSupport() {
	return (state) => {
		return state.support.isLoading
	}
}
export function getStateSupport() {
	return (state) => {
		return state.support.entities
	}
}
export function getErrorSupport() {
	return (state) => {
		return state.support.error
	}
}

export default supportReducer
