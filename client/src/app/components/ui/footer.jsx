import React, { useState } from "react"
import MenuNav from "../common/menuNav"
import ImageLink from "../common/imageLink"
import ModalWindow from "../common/modalWindow"
import FormComponent, { TextField } from "../common/form"
import Spinner from "../common/spinner"
import Message from "../common/message"
import configAuxiliary from "../../configAuxiliary.json"
import { useSelector, useDispatch } from "react-redux"
import { getCurrentUserState } from "../../store/user"
import {
	createSubscription,
	getStatusLoaderSubscription,
	getErrorSubscription,
	subscriptionErrorRemove
} from "../../store/subscription"

const Footer = () => {
	const dispatch = useDispatch()
	const currentUser = useSelector(getCurrentUserState())
	const statusLoaderSubscription = useSelector(getStatusLoaderSubscription())
	const subscriptionError = useSelector(getErrorSubscription())
	const defaultConfigSubscriptionForm = {
		name: "",
		email: "",
		phone: ""
	}
	const [dataDefault, setDataDefault] = useState(defaultConfigSubscriptionForm)
	const [stateModal, setStateModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isMessage, setMessage] = useState(false)
	const handlerSubscription = () => {
		setStateModal(true)
	}
	const handlerBackIcon = () => {
		setStateModal(false)
		dispatch(subscriptionErrorRemove())
		setDataDefault(defaultConfigSubscriptionForm)
		if (isMessage) {
			setMessage(false)
		}
	}
	const handlerSubmit = async (data) => {
		if (subscriptionError) {
			dispatch(subscriptionErrorRemove())
		}
		const isError = await dispatch(createSubscription(data))
		if (!isError) {
			setIsLoading(true)
			setTimeout(() => {
				setIsLoading(false)
				setMessage(true)
			}, 1000)
		}
	}
	const configSchema = {
		name: {
			isRequired: { message: `Поле "Имя" должно быть обязательно заполнено...` }
		},
		email: {
			isRequired: { message: `Поле "Почта" обязательно для заполнения...` },
			isEmail: { message: `Поле "Почта" не удовлетворяет требованиям...` }
		},
		phone: {
			isRequired: { message: `Поле "Телефон" обязательно для заполнения...` },
			isPhone: {
				message: `Поле "Телефон" должно начинаться с 8 и иметь в своем составе только цифры`
			},
			specificAmountElements: {
				message: `Поле "Телефон" должно содержать 11 цифр, не меньше и не больше`,
				score: 11
			}
		}
	}
	return (
		<footer className="footer">
			<div className="footer__row _container">
				<div className="footer__column">
					<MenuNav config={configAuxiliary.menuHead} />
				</div>
				<div className="footer__column">
					{currentUser && !currentUser.isAdmin && !statusLoaderSubscription && (
						<button className="footer__button" onClick={handlerSubscription}>
							Подписаться на рассылку
						</button>
					)}
				</div>
				<div className="footer__column">
					<ImageLink to="/home" />
				</div>
				<div className="footer__column">
					<div className="footer__info">
						<div className="footer__phone">
							<a href="tel:+70000000000">+7 (000) 000-00-00</a> для Москвы
						</div>
						<div className="footer__phone">
							<a href="tel:+88000000000">8 (800) 000-00-00</a> для России
						</div>
						<div className="footer__email">
							<a href="mailto:wellfitness@wellfit.ru">wellfitness@wellfit.ru</a>
						</div>
						<div className="footer__email-index">Почтовый Index: 33754</div>
						<div className="footer__adress">
							Москва, ТРК VEGAS Крокус Сити, м. Мякинино, ул. Международная 12,
							66 км МКАД
						</div>
					</div>
				</div>
			</div>
			<ModalWindow
				loadingState={isLoading}
				isModal={stateModal}
				backIcon={true}
				onBack={handlerBackIcon}
			>
				<img
					src="/img/icons/phone.svg"
					alt="Иконка телефонной трубки"
					className="footer__icon-modal"
				/>
				<h4 className="modal-window__title">Заявка на подписку</h4>
				{subscriptionError && (
					<p style={configAuxiliary.configStylesError}>{subscriptionError}</p>
				)}
				{(!isLoading && !isMessage && (
					<React.Fragment>
						<FormComponent
							config={configSchema}
							dataDefault={dataDefault}
							onSubmit={handlerSubmit}
						>
							<TextField
								name="name"
								label="Форма обращения:"
								placeholder="Укажите как к вам нужно обращаться"
							/>
							<TextField name="email" label="Почта:" placeholder="email" />
							<TextField
								name="phone"
								label="Телефон:"
								placeholder="phone"
								message="Номер телефона нужно вводить через 8 без пробелов, пример: 89445320011"
							/>
							<button className="universal-btn footer__btn-modal">
								Оформить подписку
							</button>
						</FormComponent>
						<div className="modal-window__text">
							Укажите свой номер телефона и почту, и мы будем присылать вам
							информацию обо всех акциях магазина WellFitness.
						</div>
					</React.Fragment>
				)) ||
					(isMessage && !isLoading && (
						<Message
							title="Спасибо за проявленный интерес к нашей платформе. Подписка оформлена!"
							offer="Теперь вы можете закрыть форму."
						/>
					)) || <Spinner {...configAuxiliary.configSpinnerDark} />}
			</ModalWindow>
		</footer>
	)
}

export default Footer
