import React from "react"
import CarContainer from "../../ui/carContainer"
import configAuxiliary from "../../../configAuxiliary.json"
import withWrapPage from "../../../HOC/withWrapPage"
import withLoading from "../../../HOC/withLoading"
import { getStatusLoaderPurchaseBox } from "../../../store/purchaseBox"
import { useSelector } from "react-redux"

const CarPage = () => {
	const statusLoaderPurchaseBox = useSelector(getStatusLoaderPurchaseBox())
	const CarContainerWithWrapPage = withWrapPage(
		CarContainer,
		configAuxiliary.configHeaderControllerNo
	)
	const CarContainerWithWrapPageWithLoading = withLoading(
		CarContainerWithWrapPage,
		statusLoaderPurchaseBox,
		configAuxiliary.configSpinnerDark
	)
	return <CarContainerWithWrapPageWithLoading />
}

export default CarPage
