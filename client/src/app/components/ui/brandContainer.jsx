import React from "react"
import { useParams, useHistory } from "react-router-dom"
import Message from "../common/message"
import UniversalButton from "../common/universalButton"
import BrandHeadBlock from "./brandHeadBlock"
import BrandSubHead from "./brandSubHead"
import BrandContent from "./brandContent"
import BrandSlider from "./brandSlider"
import OurStars from "../common/ourStars"
import { useSelector } from "react-redux"
import { getBrand } from "../../store/brand"

const BrandContainer = () => {
	const history = useHistory()
	const { brandID } = useParams()
	const brand = useSelector(getBrand(brandID))
	const handlerBack = () => history.push("/brands")
	return (
		<div className="brand _container">
			{brand && <h1 className="chief-title brand__title">{brand.name}</h1>}
			<UniversalButton
				onMethod={handlerBack}
				specificalClass="universal-btn brand__btn"
				text="Вернуться обратно к брендам"
			/>
			{brand ? (
				<React.Fragment>
					<BrandHeadBlock
						{...brand.additionalPage.headSection}
						brandLogo={brand.imagesPath}
						prefix={brand.additionalPage.imgPrefix}
					/>
					<BrandSubHead {...brand.additionalPage.subHeadSection} />
					<BrandContent
						{...brand.additionalPage.content}
						prefix={brand.additionalPage.imgPrefix}
					/>
					{brand.additionalPage.dinamicImage && (
						<OurStars
							prePath={brand.additionalPage.imgPrefix}
							data={brand.additionalPage.dinamicImage}
							title={`Подписанные компание ${brand.name} фитнес-модели`}
						/>
					)}
					<div className="brand__quote">{brand.additionalPage.quote}</div>
					<BrandSlider
						prefix={brand.additionalPage.imgPrefix}
						slides={brand.additionalPage.sliderImages}
					/>
				</React.Fragment>
			) : (
				<Message
					pathImage="/img/message/heart.svg"
					title="Страница бренда по такому id не найдена."
					offer={`Попробуйте указать другой идентификатор или вернитесь "назад"`}
				/>
			)}
		</div>
	)
}

export default BrandContainer
