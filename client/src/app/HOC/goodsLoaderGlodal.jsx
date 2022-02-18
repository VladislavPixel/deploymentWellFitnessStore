import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { getStatusLoaderGoods, fetchAllGoodsData } from "../store/goods"
import configAuxiliary from "../configAuxiliary.json"
import withLoading from "./withLoading"

const GoodsLoaderGlobal = ({ children }) => {
	const dispatch = useDispatch()
	const statusLoadingGoods = useSelector(getStatusLoaderGoods())
	useEffect(() => {
		if (statusLoadingGoods) {
			dispatch(fetchAllGoodsData())
		}
	}, [statusLoadingGoods, dispatch])
	const ChildrenWithLoader = withLoading(
		children,
		statusLoadingGoods,
		configAuxiliary.configSpinnerDark
	)
	return <ChildrenWithLoader />
}

GoodsLoaderGlobal.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
}

export default GoodsLoaderGlobal
