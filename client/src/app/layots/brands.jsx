import React from "react"
import BrandsPage from "../components/page/brandsPage"
import BrandPage from "../components/page/brandPage"
import { useParams } from "react-router-dom"

const Brands = () => {
	const { brandID } = useParams()
	return brandID ? <BrandPage /> : <BrandsPage />
}

export default Brands
