import React, { useState } from "react"
import BrandsHeadFilter from "./brandsHeadFilter"
import BrandsSubjectFilter from "./brandsSubjectFilter"
import BrandsList from "./brandsList"
import doubleFilter from "../../utils/doubleFilter"
import MenuNav from "../common/menuNav"
import config from "../../configAuxiliary.json"
import withMessage from "../../HOC/withMessage"
import { getBrandsCategoryData } from "../../store/brandCategory"
import { getBrandCategorySubjectData } from "../../store/brandCategorySubject"
import { useSelector } from "react-redux"
import { getBrands } from "../../store/brand"

const BrandsBlock = () => {
	const [categoryHead, setCategoryHead] = useState(null)
	const [categorySubject, setCategorySubject] = useState(null)
	const brandCategory = useSelector(getBrandsCategoryData())
	const brandsSubject = useSelector(getBrandCategorySubjectData())
	const brands = useSelector(getBrands())
	const handlerHeadCategory = (category) => {
		if (categorySubject && category.customId === "b-all") {
			setCategorySubject(null)
		}
		setCategoryHead(category)
	}
	const handlerSubjectCategory = (category) => setCategorySubject(category)
	const newArrayBrands = doubleFilter(categoryHead, categorySubject, brands)
	const configMessageForBrandsList = {
		pathImage: "/img/message/comment-dots.svg",
		alt: "Иконка собщения",
		title: "По отмеченным фильтрам ничего нет",
		offer: "Попробуйте выбрать другую комбинацию категорий"
	}
	const BrandsListWithMessage = withMessage(
		BrandsList,
		configMessageForBrandsList,
		newArrayBrands.length,
		null
	)
	return (
		<React.Fragment>
			<BrandsHeadFilter
				currentCategory={categoryHead}
				category={brandCategory}
				onUpdate={handlerHeadCategory}
			/>
			<BrandsSubjectFilter
				currentCategory={categorySubject}
				subjectCategory={brandsSubject}
				onUpdate={handlerSubjectCategory}
			/>
			<div className="brands__line">
				<div className="brands__col">
					<MenuNav config={config.menuBrend} />
				</div>
				<div className="brands__col">
					<BrandsListWithMessage brands={newArrayBrands} />
				</div>
			</div>
		</React.Fragment>
	)
}

export default BrandsBlock
