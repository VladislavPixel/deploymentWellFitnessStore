import React, { useState, useEffect } from "react"
import AdminPanelContainer from "../../ui/adminPanelContainer"
import withWrapPage from "../../../HOC/withWrapPage"
import withLoading from "../../../HOC/withLoading"
import configAuxiliary from "../../../configAuxiliary.json"
import { Redirect } from "react-router-dom"
import { getCurrentUserState } from "../../../store/user"
import { useSelector } from "react-redux"
import { getStatusLoaderSubscription } from "../../../store/subscription"
import { getStatusLoaderSupport } from "../../../store/support"
import { getStatusLoaderPurchaseBox } from "../../../store/purchaseBox"

const AdminPanelPage = () => {
	const [loaderBig, setLoaderBig] = useState(true)
	const currentUser = useSelector(getCurrentUserState())
	const AdminPanelContainerWithWrapPage = withWrapPage(
		AdminPanelContainer,
		configAuxiliary.configHeaderControllerNo
	)
	const AdminPanelContainerWithWrapPageWithLoading = withLoading(
		AdminPanelContainerWithWrapPage,
		loaderBig,
		configAuxiliary.configSpinnerDark
	)
	const flag = currentUser.isAdmin
	const statusLoaderSubscription = useSelector(getStatusLoaderSubscription())
	const statusLoaderSupport = useSelector(getStatusLoaderSupport())
	const statusLoaderPurchaseBox = useSelector(getStatusLoaderPurchaseBox())
	useEffect(() => {
		if (
			!statusLoaderSubscription &&
			!statusLoaderSupport &&
			!statusLoaderPurchaseBox
		) {
			setLoaderBig((prevState) => !prevState)
		}
	}, [statusLoaderSubscription, statusLoaderSupport, statusLoaderPurchaseBox])
	return (
		(!flag && <Redirect to="/home" />) || (
			<AdminPanelContainerWithWrapPageWithLoading />
		)
	)
}

export default AdminPanelPage
