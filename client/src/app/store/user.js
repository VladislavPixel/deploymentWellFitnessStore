import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users.service"
import authService from "../services/auth.service"
import localStorageService from "../services/localStorage.service"
import history from "../utils/history"

const initialState = {
	currentUser: null,
	isLoading: true,
	error: null,
	userId: null,
	isAuth: false
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userCurrentRequested(state) {
			state.isLoading = true
			state.error = null
		},
		userCurrentRecived(state, action) {
			state.currentUser = action.payload
			state.userId = action.payload._id
			state.isAuth = true
			state.isLoading = false
		},
		userCurrentRequestField(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		userStopedLoader(state) {
			state.isLoading = false
		},
		userSignUpRequested(state) {
			state.error = null
			state.isLoading = true
		},
		userSignUpRequestField(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		userSignInRequested(state) {
			state.error = null
			state.isLoading = true
		},
		userSignInRequestField(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		userCurrentLogout(state) {
			state.currentUser = null
			state.userId = null
			state.isAuth = null
		},
		userRecoveryPassRequested(state) {
			state.error = null
			state.isLoading = true
		},
		userRecoveryPassRecived(state) {
			state.isLoading = false
		},
		userRecoveryPassRequestField(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		userUpdatedRequestField(state, action) {
			state.error = action.payload
		},
		userUpdatedRequest(state) {
			state.error = null
		},
		userUpdatedRecived(state, action) {
			if (state.currentUser.numberOfPurchases) {
				state.currentUser.numberOfPurchases += action.payload
			} else {
				state.currentUser.numberOfPurchases = action.payload
			}
		}
	}
})

const { actions, reducer: userReducer } = userSlice
const {
	userUpdatedRequestField,
	userUpdatedRecived,
	userUpdatedRequest,
	userRecoveryPassRequested,
	userRecoveryPassRecived,
	userRecoveryPassRequestField,
	userCurrentLogout,
	userSignInRequestField,
	userSignInRequested,
	userSignUpRequestField,
	userSignUpRequested,
	userCurrentRequested,
	userCurrentRequestField,
	userCurrentRecived,
	userStopedLoader
} = actions

// Actions
export function userUpdate(payload) {
	return async (dispatch) => {
		dispatch(userUpdatedRequest())
		try {
			await userService.update(payload)
			dispatch(userUpdatedRecived(payload.numberOfPurchases))
		} catch (err) {
			dispatch(userUpdatedRequestField(err.message))
		}
	}
}
export function userRecoveryPassword(payload) {
	return async (dispatch) => {
		dispatch(userRecoveryPassRequested())
		try {
			await userService.recoveryPassword(payload)
			dispatch(userRecoveryPassRecived())
			history.push("/login")
		} catch (err) {
			const { code, message } = err.response.data.error
			if (code !== 500) {
				if (code === 400) {
					if (message === "EMAIL_NOT_FOUND") {
						dispatch(
							userRecoveryPassRequestField(
								"Пройдите процесс регистрации. Такой пользователь не существует."
							)
						)
					} else {
						dispatch(userRecoveryPassRequestField(message))
					}
				} else if (code === 401) {
					if (message === "INVALID_DATA") {
						dispatch(
							userRecoveryPassRequestField(
								"Введенные данные не соответствуют действительности. INVALID_DATA"
							)
						)
					} else {
						dispatch(userRecoveryPassRequestField(message))
					}
				} else {
					dispatch(
						userRecoveryPassRequestField("Ошибка связанная не с сервером.")
					)
				}
			} else {
				dispatch(userRecoveryPassRequestField(err.message))
			}
		}
	}
}
export function userLogOut() {
	return (dispatch) => {
		localStorageService.removeAuthorization()
		dispatch(userCurrentLogout())
		history.replace("/")
	}
}
export function userSignIn(payload) {
	return async (dispatch) => {
		dispatch(userSignInRequested())
		try {
			const { data } = await authService.signIn(payload)
			localStorageService.setToken(data)
			const { content } = await userService.getUserOnId()
			dispatch(userCurrentRecived(content))
			history.push(
				history.location.state ? history.location.state.from : "/home"
			)
			console.log("Authorization passed!")
		} catch (err) {
			const { code, message } = err.response.data.error
			if (code === 400) {
				if (message === "EMAIL_NOT_FOUND") {
					dispatch(userSignInRequestField("Такой email не существует"))
				}
				if (message === "INVALID_PASSWORD") {
					dispatch(userSignInRequestField("Вы указали неверный пароль"))
				}
				if (message !== "EMAIL_NOT_FOUND" || message !== "INVALID_PASSWORD") {
					dispatch(
						userSignInRequestField("Непредвиденная ошибка со статусом 400")
					)
				}
			} else {
				dispatch(userSignInRequestField(err.message))
			}
		}
	}
}
export function userSignUp(payload) {
	return async (dispatch) => {
		dispatch(userSignUpRequested())
		try {
			const { data } = await authService.signUp(payload)
			localStorageService.setToken(data)
			dispatch(userCurrentRequested())
			const { content } = await userService.getUserOnId()
			dispatch(userCurrentRecived(content))
			history.push("/home")
			console.log("Registration passed!")
		} catch (err) {
			const { code, message } = err.response.data.error
			if (code === 400) {
				if (message === "EMAIL_EXISTS") {
					dispatch(
						userSignUpRequestField(
							"Учетная запись с такой почтой уже существует!!!"
						)
					)
				}
				if (message !== "EMAIL_EXISTS") {
					dispatch(
						userSignUpRequestField("Непредвиденная ошибка со статусом 400")
					)
				}
			} else {
				dispatch(userSignUpRequestField(err.message))
			}
		}
	}
}
export function getUserCurrent() {
	// Для удержания сессии
	return async (dispatch) => {
		dispatch(userCurrentRequested())
		try {
			const { content } = await userService.getUserOnId()
			dispatch(userCurrentRecived(content))
		} catch (err) {
			dispatch(userCurrentRequestField(err.message))
		}
	}
}
export function stopLoadingForNoAuth() {
	return (dispatch) => {
		dispatch(userStopedLoader())
	}
}

// Selectors
export function getStatusLoaderUser() {
	return (state) => {
		return state.user.isLoading
	}
}
export function getErrorUser() {
	return (state) => {
		return state.user.error
	}
}
export function getCurrentUserState() {
	return (state) => {
		return state.user.currentUser
	}
}
export function getStatusAuthUser() {
	return (state) => {
		return state.user.isAuth
	}
}

export default userReducer
