import React from "react"
import GoodPage from "../components/page/goodPage"
import HomePage from "../components/page/homePage"
import { useParams } from "react-router-dom"
import { getStatusLoaderCar } from "../store/car"
import { useSelector } from "react-redux"
import configAuxiliary from "../configAuxiliary.json"
import withLoading from "../HOC/withLoading"

const Home = () => {
	const { goodID } = useParams()
	const statusLoaderCar = useSelector(getStatusLoaderCar())
	const GoodPageWithLoader = withLoading(
		GoodPage,
		statusLoaderCar,
		configAuxiliary.configSpinnerDark
	)
	if (goodID) return <GoodPageWithLoader />
	if (!goodID) return <HomePage />
}

export default Home
