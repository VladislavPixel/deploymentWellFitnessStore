import React, { useEffect, useState } from "react"
import BrandsBlock from "./brandsBlock"
import {
	fetchAllBrandsCategory,
	getStatusLoaderBrandsCategory
} from "../../store/brandCategory"
import {
	getStatusLoaderBrandCategorySubject,
	fetchAllBrandCategorySubject
} from "../../store/brandCategorySubject"
import { getStatusLoaderBrands, fetchAllBrandData } from "../../store/brand"
import { useSelector, useDispatch } from "react-redux"
import configAuxiliary from "../../configAuxiliary.json"
import withLoading from "../../HOC/withLoading"

const BrandsContainer = () => {
	const [brandsCategoryLoader, setBrandsCategoryLoader] = useState(true)
	const dispatch = useDispatch()
	const statusLoaderBrandsCategory = useSelector(
		getStatusLoaderBrandsCategory()
	)
	const statusLoaderBrandsCategorySubject = useSelector(
		getStatusLoaderBrandCategorySubject()
	)
	const statusLoaderBrands = useSelector(getStatusLoaderBrands())
	useEffect(() => {
		if (
			statusLoaderBrandsCategory &&
			statusLoaderBrandsCategorySubject &&
			statusLoaderBrands
		) {
			dispatch(fetchAllBrandsCategory())
			dispatch(fetchAllBrandCategorySubject())
			dispatch(fetchAllBrandData())
		}
		if (
			!statusLoaderBrandsCategory &&
			!statusLoaderBrandsCategorySubject &&
			!statusLoaderBrands
		) {
			setBrandsCategoryLoader(false)
		}
	}, [
		statusLoaderBrandsCategory,
		statusLoaderBrandsCategorySubject,
		statusLoaderBrands,
		dispatch
	])
	const BrandsBlockWithLoading = withLoading(
		BrandsBlock,
		brandsCategoryLoader,
		configAuxiliary.configSpinnerDark
	)
	return (
		<div className="brands _container">
			<h1 className="chief-title brands__title">Бренды</h1>
			<BrandsBlockWithLoading />
		</div>
	)
}

export default BrandsContainer
