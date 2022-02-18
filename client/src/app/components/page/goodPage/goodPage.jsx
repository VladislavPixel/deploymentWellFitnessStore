import React from "react"
import { useParams } from "react-router-dom"
import CurrentGood from "../../ui/currentGood"
import withMessage from "../../../HOC/withMessage"
import configAuxiliary from "../../../configAuxiliary.json"
import withWrapPage from "../../../HOC/withWrapPage"
import { getGood, updateGood } from "../../../store/goods"
import { useSelector, useDispatch } from "react-redux"
import { pushElementAtCar } from "../../../store/car"

const GoodPage = () => {
	const dispatch = useDispatch()
	const { goodID } = useParams()
	const good = useSelector(getGood(goodID))
	const handlerSubmitOnCar = ({ totalInStock, count, currentUser }) => {
		dispatch(updateGood({ ...good, totalInStock }))
		dispatch(pushElementAtCar({ ...good, totalInStock, count, currentUser }))
	}
	const configMessageForCurrentGood = {
		pathImage: "/img/message/human.svg",
		alt: "Картинка активного пользователя.",
		title: "По данному запросу ничего не найдено.",
		offer: "Попробуйте использовать другой ID товара"
	}
	const CurrentGoodWithMessage = withMessage(
		CurrentGood,
		configMessageForCurrentGood,
		good
	)
	const CurrentGoodWithMessageWrapPage = withWrapPage(
		CurrentGoodWithMessage,
		configAuxiliary.configHeaderControllerNo
	)
	return (
		<CurrentGoodWithMessageWrapPage good={good} onSubmit={handlerSubmitOnCar} />
	)
}

export default GoodPage
