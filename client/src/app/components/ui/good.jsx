import React from "react"
import UniversalButton from "../common/universalButton"
import ImageLink from "../common/imageLink"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import config from "../../config.json"

const Good = ({
	_id,
	name,
	price,
	description,
	category,
	totalInStock,
	pathServerImage
}) => {
	const pathGood = `/home/${_id}`
	const history = useHistory()
	const handlerOpenGood = () => {
		history.push(pathGood)
	}
	return (
		<article className="good">
			<div className="good__column">
				<ImageLink
					classes="good__images"
					to={pathGood}
					pathImage={`${config.endPoinForImage}${pathServerImage.replaceAll(
						"\\",
						"/"
					)}`}
					alt={`Товар: ${name}`}
				/>
			</div>
			<div className="good__column">
				<div className="good__info-body body-info">
					<div className="body-info__name">{`Наименование товара: ${name}`}</div>
					<div className="body-info__category">{`Категория: ${category}`}</div>
					<div className="body-info__id">{`ID: ${_id}`}</div>
					<div className="body-info__price">{`Цена: ${price}p`}</div>
					<div className="body-info__score">{`Всего на складе: ${totalInStock}`}</div>
					<div className="body-info__descrip">{`Описание: ${description}`}</div>
				</div>
			</div>
			<div className="good__column">
				<UniversalButton
					onMethod={handlerOpenGood}
					specificalClass="universal-btn good__btn"
					text="Перейти к товару"
				/>
			</div>
		</article>
	)
}

Good.propTypes = {
	_id: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	description: PropTypes.string,
	category: PropTypes.string,
	totalInStock: PropTypes.number,
	pathServerImage: PropTypes.string
}

export default Good
