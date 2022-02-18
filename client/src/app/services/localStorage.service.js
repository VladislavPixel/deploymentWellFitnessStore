const ACCESS_TOKEN = "accessToken"
const REFRESH_TOKEN = "refreshToken"
const EXPIRES_IN = "expiresIn"
const USER_ID = "userId"

export function saveToken({ expiresIn, accessToken, refreshToken, userId }) {
	const newTimeLiveJsonToken = expiresIn * 1000 + Date.now()

	localStorage.setItem(ACCESS_TOKEN, accessToken)
	localStorage.setItem(REFRESH_TOKEN, refreshToken)
	localStorage.setItem(EXPIRES_IN, newTimeLiveJsonToken)
	localStorage.setItem(USER_ID, userId)
}

export function getTimeLiveToken() {
	return localStorage.getItem(EXPIRES_IN)
}

export function getIdToken() {
	return localStorage.getItem(ACCESS_TOKEN)
}

export function getRefreshToken() {
	return localStorage.getItem(REFRESH_TOKEN)
}

export function getLocalId() {
	return localStorage.getItem(USER_ID)
}

export function removeAuthorization() {
	localStorage.removeItem(ACCESS_TOKEN)
	localStorage.removeItem(REFRESH_TOKEN)
	localStorage.removeItem(EXPIRES_IN)
	localStorage.removeItem(USER_ID)
}

const localStorageService = {
	setToken: saveToken,
	getLiveTimeToken: getTimeLiveToken,
	getIdToken: getIdToken,
	getRefreshToken: getRefreshToken,
	getLocalId: getLocalId,
	removeAuthorization: removeAuthorization
}

export default localStorageService
