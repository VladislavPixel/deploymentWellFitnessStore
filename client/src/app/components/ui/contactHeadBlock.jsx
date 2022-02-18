import React, { useState } from "react"
import ContactsSlider from "./contactsSlider"
import UniversalButton from "../common/universalButton"
import ModalWindow from "../common/modalWindow"
import FormComponent, { TextField, TextAreaField } from "../common/form"
import Message from "../common/message"
import Spinner from "../common/spinner"
import configAuxiliary from "../../configAuxiliary.json"
import { useSelector, useDispatch } from "react-redux"
import { getCurrentUserState } from "../../store/user"
import {
	createSupport,
	getStatusLoaderSupport,
	getErrorSupport,
	removeErrorSupport
} from "../../store/support"

const ContactHeadBlock = () => {
	const statusLoaderSupport = useSelector(getStatusLoaderSupport())
	const errorSupport = useSelector(getErrorSupport())
	const dispatch = useDispatch()
	const [isLoading, setLoading] = useState(false)
	const [isMessage, setMessage] = useState(false)
	const [stateModal, setStateModal] = useState(false)
	const currentUser = useSelector(getCurrentUserState())
	const dataDefaultConfigSupport = {
		name: "",
		email: "",
		message: ""
	}
	const [dataDefault, setDataDefault] = useState(dataDefaultConfigSupport)
	const handlerBtn = () => {
		setStateModal(true)
	}
	const handlerBackIcon = () => {
		if (errorSupport) {
			dispatch(removeErrorSupport())
		}
		setStateModal(false)
		setMessage(false)
		setDataDefault(dataDefaultConfigSupport)
	}
	const handlerSubmit = async (data) => {
		const isError = await dispatch(createSupport(data))
		if (!isError) {
			setLoading(true)
			setTimeout(() => {
				setLoading(false)
				setMessage(true)
			}, 2000)
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
		message: {
			isRequired: { message: `Поле "Сообщение" обязательно для заполнения...` }
		}
	}
	return (
		<div className="contact__head-block head-block">
			{(!stateModal && (
				<React.Fragment>
					<div className="head-block__column">
						<div className="head-block__container">
							<h2 className="head-block__title chief-sub-title">
								Фирменный магазин Well Fitness
							</h2>
							<div className="head-block__time">
								Режим работы: 10:00 - 21:00
							</div>
							<div className="head-block__adress">
								Москва, ТРК VEGAS Крокус Сити, м. Мякинино, ул. Международная
								12, 66км МКАД
							</div>
							<a
								href="mailto:wellfitness@wellfit.ru"
								className="head-block__mail"
							>
								wellfitness@wellfit.ru
							</a>
							<a href="tel:+74996775632" className="head-block__phone">
								+7 (499) 677-56-32
							</a>
							<span>доб. 1</span>
							{currentUser && !currentUser.isAdmin && !statusLoaderSupport && (
								<UniversalButton
									onMethod={handlerBtn}
									specificalClass="head-block__btn universal-btn"
									text="Написать нам"
								/>
							)}
						</div>
					</div>
					<div className="head-block__column">
						<ContactsSlider />
					</div>
				</React.Fragment>
			)) || (
				<ModalWindow
					isModal={stateModal}
					backIcon={true}
					onBack={handlerBackIcon}
				>
					<img
						src="/img/icons/support.svg"
						alt="Иконка службы поддержки"
						className="head-block__icon-modal"
					/>
					<h4 className="modal-window__title">Вопрос консультантам</h4>
					{errorSupport && (
						<p style={configAuxiliary.configStylesError}>{errorSupport}</p>
					)}
					{(!isLoading && !isMessage && (
						<FormComponent
							config={configSchema}
							dataDefault={dataDefault}
							onSubmit={handlerSubmit}
						>
							<TextField
								name="name"
								label="Форма обращения:"
								placeholder="укажите как к вам нужно обращаться"
							/>
							<TextField name="email" label="Почта:" placeholder="email" />
							<TextAreaField
								name="message"
								label="Сообщение:"
								placeholder="задайте нам свой вопрос"
							/>
							<button className="head-block__btn universal-btn">
								Отправить сообщение
							</button>
						</FormComponent>
					)) ||
						(isMessage && (
							<Message
								title="Спасибо за обращение!"
								offer="Наша служба поддержки обязательно рассмотрит его и свяжется с вами."
							/>
						)) || <Spinner {...configAuxiliary.configSpinnerDark} />}
				</ModalWindow>
			)}
		</div>
	)
}

export default ContactHeadBlock
