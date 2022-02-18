import React, { useEffect } from "react"
import PropTypes from "prop-types"
import localStorageService from "../services/localStorage.service"
import {
	getUserCurrent,
	stopLoadingForNoAuth,
	getStatusLoaderUser,
	getStatusAuthUser,
	getCurrentUserState
} from "../store/user"
import { useDispatch, useSelector } from "react-redux"
import configAuxiliary from "../configAuxiliary.json"
import { fetchAllCar, doStopLoaderCar } from "../store/car"
import {
	fetchAllSubscriptionData,
	subscriptionStopLoader
} from "../store/subscription"
import { fetchAllSupportData, stopLoaderSupport } from "../store/support"
import {
	fetchAllPurchaseBoxData,
	stopLoaderPurchaseBox
} from "../store/purchaseBox"
import withLoading from "./withLoading"

const GlobalLoaderAuth = ({ children }) => {
	const dispatch = useDispatch()
	const statusLoaderUser = useSelector(getStatusLoaderUser())
	const statusAuth = useSelector(getStatusAuthUser())
	const currentUser = useSelector(getCurrentUserState())
	useEffect(() => {
		if (localStorageService.getLocalId()) {
			dispatch(getUserCurrent())
		} else {
			dispatch(stopLoadingForNoAuth())
		}
	}, [dispatch])
	useEffect(() => {
		if (statusAuth) {
			if (currentUser && currentUser.isAdmin) {
				dispatch(fetchAllSubscriptionData())
				dispatch(fetchAllSupportData())
				dispatch(fetchAllPurchaseBoxData())
			} else {
				dispatch(subscriptionStopLoader())
				dispatch(stopLoaderSupport())
				dispatch(stopLoaderPurchaseBox())
				dispatch(fetchAllCar(currentUser))
			}
		} else {
			dispatch(doStopLoaderCar())
		}
	}, [statusAuth, dispatch, currentUser])
	const ChildrenWithLoader = withLoading(
		children,
		statusLoaderUser,
		configAuxiliary.configSpinnerDark
	)
	return <ChildrenWithLoader />
}

GlobalLoaderAuth.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
}

export default GlobalLoaderAuth
