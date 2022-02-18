import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import getSumTotal from "../../utils/getSumTotal"
import CarElement from "./carElement"
import UniversalButton from "../common/universalButton"
import ImageLink from "../common/imageLink"
import WarrantyCard from "./warrantyСard"
import Message from "../common/message"
import Spinner from "../common/spinner"
import ModalWindow from "../common/modalWindow"
import getDate from "../../utils/getDate"
import getControlSum from "../../utils/getControlSum"
import Delivery from "./delivery"
import configAuxiliary from "../../configAuxiliary.json"
import { useSelector, useDispatch } from "react-redux"
import {
	getGoodsData,
	getStatusLoaderGoods,
	updateGood
} from "../../store/goods"
import { getCurrentUserState, userUpdate } from "../../store/user"
import { getCarState, deleteElementAtCar, getCarError } from "../../store/car"
import { createPurchaseBoxElement } from "../../store/purchaseBox"

const CarContainer = () => {
	const dispatch = useDispatch()
	const currentUser = useSelector(getCurrentUserState())
	const history = useHistory()
	const [stateDelivery, setStateDelivery] = useState(null)
	const [isModal, setIsModal] = useState(false)
	const [guarantee, setGuarantee] = useState([])
	const carState = useSelector(getCarState())
	const isLoading = useSelector(getStatusLoaderGoods())
	const goods = useSelector(getGoodsData())
	const total = getSumTotal(carState)
	const arrayExpensiveGoods = carState.filter((good) => good.price > 35000)
	const handlerDeleteCarElement = (id) => {
		const elementCar = carState.find((item) => item._id === id)
		const elementGood = goods.find(
			(element) => element.name === elementCar.name
		)
		const newElementGood = { ...elementGood }
		newElementGood.totalInStock += elementCar.count
		dispatch(updateGood(newElementGood))
		dispatch(deleteElementAtCar(id))
	}
	const handlerUpdateGuarantee = (stateControl) => {
		const newArray = guarantee.filter((item) => item.name !== stateControl.name)
		setGuarantee([...newArray, stateControl])
	}
	const handlerArrange = () => {
		dispatch(createPurchaseBoxElement({ carState, stateDelivery, guarantee }))
		setIsModal(true)
	}
	const handlerModalBtn = () => {
		history.replace("/home")
		dispatch(userUpdate({ numberOfPurchases: 1 }))
		dispatch(deleteElementAtCar())
	}
	const handlerUpdateStateDelivery = (object) => setStateDelivery(object)
	const carError = useSelector(getCarError())
	const textModal = (
		<p>
			Ваш заказ №{getControlSum()} от {getDate()} оформлен. Вся актуальная
			информация о статусе исполнения заказа придет на указанный email:{" "}
			{currentUser.email}
		</p>
	)
	return (
		(isLoading && <Spinner {...configAuxiliary.configSpinnerDark} />) || (
			<React.Fragment>
				<section className="car-container">
					<article className="car-container__column">
						{carError && (
							<div
								style={configAuxiliary.configStylesError}
							>{`Если вы видите это сообщение, значит у Вас произошла ошибка при удалении элемента из корзины. Обновите страницу и повторите действия! ${carError}`}</div>
						)}
						{(total > 0 && (
							<React.Fragment>
								{carState.map((item) => (
									<CarElement
										key={item._id}
										{...item}
										onDelete={handlerDeleteCarElement}
									/>
								))}
								{arrayExpensiveGoods.length > 0 && (
									<React.Fragment>
										<h3 className="car-container__message">
											У вас открылась бонусная программа{" "}
											<span>&#34;Гарантийный талон&#34;</span>, так как сумма некоторых
											товаров в вашей корзине превышает 35 000р (за 1 товар).
										</h3>
										{arrayExpensiveGoods.map((item) => (
											<WarrantyCard
												key={item._id}
												{...item}
												onUpdateGuarantee={handlerUpdateGuarantee}
											/>
										))}
									</React.Fragment>
								)}
								<Delivery onUpdate={handlerUpdateStateDelivery} />
							</React.Fragment>
						)) || (
							<Message
								pathImage="/img/message/sad-smile.svg"
								alt="Грустный смайлик"
								title="В вашей корзине ничего не найдено."
								offer="Перейдите к каталогу всех товаров и выберите что-нибудь."
							/>
						)}
					</article>
					<article className="car-container__column">
						<aside className="car-container__sidebar sidebar-car">
							<div className="sidebar-car__body">
								<div className="sidebar-car__title-total">ИТОГ:</div>
								<div className="sidebar-car__sub-title">
									<h3>{`${total} р`}</h3>
								</div>
								{guarantee.length > 0 &&
									guarantee.map((item, index) => (
										<div
											key={index}
											className="sidebar-car__guarantee"
										>{`+ ${item.warrantyPrice}р за гарантию для ${item.name}`}</div>
									))}
								<div className="sidebar-car__icon-container">
									<ImageLink
										classes="sidebar-car__icon"
										pathImage="/img/car/truck.svg"
										to="#"
										alt="Иконка грузового трака"
									/>
								</div>
								{total > 0 && (
									<div className="sidebar-car__button-container">
										<UniversalButton
											onMethod={handlerArrange}
											text="Оформить заказ"
											specificalClass={
												"universal-btn sidebar-car__button" +
												(stateDelivery ? " active" : "")
											}
										/>
									</div>
								)}
							</div>
							<div className="sidebar-car__footer">
								<div className="sidebar-car__flag"></div>
							</div>
						</aside>
					</article>
				</section>
				<ModalWindow isModal={isModal}>
					<h4 className="modal-window__title">Благодарим за заказ!</h4>
					<div className="modal-window__sub-title">
						<p>
							Номер заказа <span>{getControlSum()}</span>
						</p>
					</div>
					<div className="modal-window__text">{textModal}</div>
					<UniversalButton
						onMethod={handlerModalBtn}
						specificalClass="universal-btn modal-window__btn"
						text="Вернуться на главную"
					/>
				</ModalWindow>
			</React.Fragment>
		)
	)
}

export default CarContainer
