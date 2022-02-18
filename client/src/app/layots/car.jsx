import React from "react"
import CarPage from "../components/page/carPage"
import { getStatusLoaderCar } from "../store/car"
import { useSelector } from "react-redux"
import configAuxiliary from "../configAuxiliary.json"
import withLoading from "../HOC/withLoading"

const Car = () => {
	const statusLoaderCar = useSelector(getStatusLoaderCar())
	const CarPageWithLoading = withLoading(
		CarPage,
		statusLoaderCar,
		configAuxiliary.configSpinnerDark
	)
	return <CarPageWithLoading />
}

export default Car
