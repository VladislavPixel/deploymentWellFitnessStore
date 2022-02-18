import { createSlice, createAction } from "@reduxjs/toolkit"
import subscriptionService from "../services/subscription.service"

const initialState = {
	entities: [],
	isLoading: true,
	error: null
}

const subscriptionSlice = createSlice({
	name: "subscription",
	initialState,
	reducers: {
		subscriptionRequested(state) {
			state.isLoading = true
		},
		subscriptionRecived(state, action) {
			state.entities = action.payload
			state.isLoading = false
		},
		subscriptionRequestField(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		subscriptionStopedLoader(state) {
			state.isLoading = false
		},
		subscriptionDeletedSub(state, action) {
			const newArray = [...state.entities]
			state.entities = newArray.filter((el) => el._id !== action.payload)
		},
		subscriptionCreateRequestField(state, action) {
			state.error = action.payload
		},
		subscriptionRemovedError(state) {
			state.error = null
		}
	}
})

const { actions, reducer: subscriptionReducer } = subscriptionSlice
const {
	subscriptionRequested,
	subscriptionRemovedError,
	subscriptionCreateRequestField,
	subscriptionDeletedSub,
	subscriptionStopedLoader,
	subscriptionRecived,
	subscriptionRequestField
} = actions

const subscriptionCreateRequested = createAction(
	"subscription/subscriptionCreateRequested"
)
const subscriptionDeleteRequested = createAction(
	"subscription/subscriptionDeleteRequested"
)
const subscriptionDeleteRequestField = createAction(
	"subscription/subscriptionDeleteRequestField"
)

// utils
function randomValue(min, max) {
	return Math.floor(min - 0.5 + Math.random() * (max - min + 1) * Date.now())
}

// Actions
export function deleteSubscription(id) {
	return async (dispatch) => {
		dispatch(subscriptionDeleteRequested())
		try {
			await subscriptionService.delete(id)
			dispatch(subscriptionDeletedSub(id))
		} catch (err) {
			dispatch(subscriptionDeleteRequestField(err.message))
		}
	}
}
export function fetchAllSubscriptionData() {
	return async (dispatch) => {
		dispatch(subscriptionRequested())
		try {
			const { content } = await subscriptionService.fetchAll()
			dispatch(subscriptionRecived(content))
		} catch (err) {
			dispatch(subscriptionRequestField(err.message))
		}
	}
}
export function subscriptionStopLoader() {
	return (dispatch) => {
		dispatch(subscriptionStopedLoader())
	}
}
export function createSubscription(data) {
	return async (dispatch) => {
		dispatch(subscriptionCreateRequested())
		try {
			await subscriptionService.create({ ...data, images: randomValue(5, 255) })
		} catch (err) {
			const { code, message } = err.response.data.error
			if (code < 500) {
				if (code === 400 && message === "EMAIL_EXISTS") {
					dispatch(
						subscriptionCreateRequestField(
							"Подписка на эту почту уже оформлена на платформе"
						)
					)
				} else {
					dispatch(subscriptionCreateRequestField(err.message))
				}
			} else {
				dispatch(subscriptionCreateRequestField(err.message))
			}
			return true
		}
	}
}
export function subscriptionErrorRemove() {
	return (dispatch) => {
		dispatch(subscriptionRemovedError())
	}
}

// Selectors
export function getStatusLoaderSubscription() {
	return (state) => {
		return state.subscription.isLoading
	}
}
export function getSubscriptionState() {
	return (state) => {
		return state.subscription.entities
	}
}
export function getErrorSubscription() {
	return (state) => {
		return state.subscription.error
	}
}

export default subscriptionReducer
