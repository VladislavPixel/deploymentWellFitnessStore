import React, { useState } from "react"
import PropTypes from "prop-types"
import QuantityController from "../common/quantityСontroller"
import { useHistory } from "react-router-dom"
import UniversalButton from "../common/universalButton"
import ImageLink from "../common/imageLink"
import { useSelector } from "react-redux"
import { getCurrentUserState } from "../../store/user"
import { getErrorGood } from "../../store/goods"
import { getCarError } from "../../store/car"
import configAuxiliary from "../../configAuxiliary.json"

const CurrentGoodCard = ({
	_id,
	price,
	totalInStock,
	category,
	name,
	onSubmit
}) => {
	const [warehouse, setWarehouse] = useState(totalInStock)
	const [currentTotal, setCurrentTotal] = useState(0)
	const currentUser = useSelector(getCurrentUserState())
	const errorGood = useSelector(getErrorGood())
	const errorCar = useSelector(getCarError())
	const history = useHistory()
	let path = "/img/goods/icon/"
	switch (category) {
	case "Бег":
		path += "flyMan.svg"
		break
	case "Для дома":
		path += "hand.svg"
		break
	case "Единоборства":
		path += "box.svg"
		break
	case "Туризм, активный отдых":
		path += "tourism.svg"
		break
	case "Плавание, пляж, водный спорт":
		path += "swimm.svg"
		break
	case "Тренажеры и фитнес":
		path += "spa.svg"
		break
	default:
		break
	}
	const handlerBack = () => {
		history.push("/home")
	}
	const handlerBuy = () => {
		if (currentTotal !== 0) {
			onSubmit({
				currentUser: currentUser._id,
				totalInStock: warehouse,
				count: currentTotal
			})
		}
	}
	const handlerUpdateTotalDecrement = () => {
		if (currentTotal !== 0) {
			setCurrentTotal((prevState) => (prevState -= 1))
			setWarehouse((prevState) => (prevState += 1))
		}
	}
	const handlerUpdateTotalIncrement = () => {
		if (warehouse !== 0) {
			setCurrentTotal((prevState) => (prevState += 1))
			setWarehouse((prevState) => (prevState -= 1))
		}
	}
	return (
		<div className="current-good__content">
			<div className="current-good__body">
				<h3 className="current-good__title">{name}</h3>
				<ImageLink
					classes="current-good__icon"
					pathImage={path}
					alt="Иконка символизирующая товар"
				/>
				<div className="current-good__category">{`Категория: ${category}`}</div>
				<div className="current-good__warehouse">{`Количество на складе: ${warehouse}`}</div>
				{currentUser && !currentUser.isAdmin && (
					<React.Fragment>
						<QuantityController
							classes="quantity-controller"
							onDecrement={handlerUpdateTotalDecrement}
							onIncrement={handlerUpdateTotalIncrement}
						/>
						<div className="current-good__current-total">{`Количество, выбранное вами - ${currentTotal}`}</div>
					</React.Fragment>
				)}
				<div className="current-good__price">{`Цена: ${price}p`}</div>
				{errorCar && (
					<div
						style={configAuxiliary.configStylesError}
					>{`Вы выдите эту ошибку. Значит что-то пошло не так. Обновите страницу и повторите действия! ${errorCar}`}</div>
				)}
				{errorGood && (
					<div
						style={configAuxiliary.configStylesError}
					>{`Если возникла эта ошибка попробуйте обновить страницу и повторите действия! ${errorGood}`}</div>
				)}
				<div className="current-good__button-container">
					{currentUser && !currentUser.isAdmin && (
						<UniversalButton
							text="Отправить в корзину"
							specificalClass="universal-btn current-good__btn-buy"
							onMethod={handlerBuy}
						/>
					)}
					<UniversalButton
						text="Вернуться обратно ко всем товарам"
						specificalClass="universal-btn current-good__btn"
						onMethod={handlerBack}
					/>
				</div>
			</div>
			<div className="current-good__footer">
				<div className="current-good__id-good">{`ID товара: ${_id}`}</div>
			</div>
		</div>
	)
}

CurrentGoodCard.propTypes = {
	_id: PropTypes.string,
	price: PropTypes.number,
	totalInStock: PropTypes.number,
	category: PropTypes.string,
	name: PropTypes.string,
	onSubmit: PropTypes.func
}

export default CurrentGoodCard
