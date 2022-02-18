import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import FormComponent, { TextField, SelectField } from "../common/form"
import getArrayDaysDuringWeek from "../../utils/getArrayDaysDuringWeek"
import configAuxiliary from "../../configAuxiliary.json"
import Message from "../common/message"
import Spinner from "../common/spinner"

const Delivery = ({ onUpdate }) => {
	const [stateMessage, setStateMessage] = useState(null)
	const [dataDefault] = useState({
		city: "",
		road: "",
		home: "",
		housing: "",
		room: "",
		date: "",
		time: "",
		phone: ""
	})
	const idTime = useRef(null)
	const configValidate = {
		city: {
			isRequired: {
				message: `Поле "Город" является обязательным для заполнения`
			}
		},
		road: {
			isRequired: {
				message: `Поле "Улица" является обязательным для заполнения`
			}
		},
		home: {
			isRequired: {
				message: `Поле "Дом" является обязательным для заполнения`
			},
			isNumber: {
				message: `Поле "Дом" должно иметь в своем составе только цифры`
			}
		},
		housing: {
			isRequired: {
				message: `Поле "Корпус/строение" является обязательным для заполнения`
			},
			isNumber: {
				message: `Поле "Корпус/строение" должно иметь в своем составе только цифры`
			}
		},
		room: {
			isRequired: {
				message: `Поле "Квартира" является обязательным для заполнения`
			},
			isNumber: {
				message: `Поле "Квартира" должно иметь в своем составе только цифры`
			}
		},
		date: {
			isRequired: {
				message: `Поле "Дата доставки" является обязательным для заполнения`
			}
		},
		time: {
			isRequired: {
				message: `Поле "Время доставки" является обязательным для заполнения`
			}
		},
		phone: {
			isRequired: {
				message: `Поле "Телефон" является обязательным для заполнения`
			},
			isPhone: {
				message: `Поле "Телефон" должно начинаться с 8 и иметь в своем составе только цифры`
			},
			specificAmountElements: {
				message: `Поле "Телефон" должно содержать 11 цифр, не меньше и не больше`,
				score: 11
			}
		}
	}
	const handlerSubmit = (data) => {
		setStateMessage("spinner")
		const id = setTimeout(() => {
			setStateMessage("message")
			onUpdate(data)
		}, 1000)
		idTime.current = id
	}
	useEffect(() => {
		if (idTime.current) {
			return () => {
				clearTimeout(idTime.current)
			}
		}
	})
	return (
		(stateMessage === "spinner" && (
			<Spinner {...configAuxiliary.configSpinnerDark} />
		)) ||
		(stateMessage === "message" && (
			<Message
				pathImage="/img/car/box.svg"
				title="Благодарим вас за предоставленные данные."
				offer="Политика конфиденциальности личных данных обязательно будет соблюдена."
			/>
		)) || (
			<div className="delivery">
				<h3 className="delivery__title">Доставка</h3>
				<div className="delivery__sub-title">
					Перед тем как нажимать кнопку &#34;Оформить заказ&#34;, вам нужно указать
					некоторые данные.
				</div>
				<FormComponent
					config={configValidate}
					dataDefault={dataDefault}
					onSubmit={handlerSubmit}
				>
					<TextField
						name="city"
						label="Город"
						placeholder="city"
						classesSearch="delivery__container"
						inputContainerClass=" delivery__container-input-big delivery__container-input-big_m"
					/>
					<TextField
						name="road"
						label="Улица"
						placeholder="road"
						classesSearch="delivery__container"
						inputContainerClass=" delivery__container-input-big"
					/>
					<TextField
						name="home"
						label="Дом"
						placeholder="home"
						classesSearch="delivery__container"
						inputContainerClass=" delivery__container-input-small delivery__container-input-small_m"
					/>
					<TextField
						name="housing"
						label="Корпус/строение"
						placeholder="housing"
						classesSearch="delivery__container"
						inputContainerClass=" delivery__container-input-small delivery__container-input-small_m"
					/>
					<TextField
						name="room"
						label="Квартира"
						placeholder="room"
						classesSearch="delivery__container"
						inputContainerClass=" delivery__container-input-small"
					/>
					<TextField
						name="phone"
						label="Телефон"
						placeholder="phone"
						classesSearch="delivery__container"
						inputContainerClass=" delivery__container-input-big"
					/>
					<SelectField
						classesGlobal="delivery__container"
						label="Дата доставки"
						name="date"
						placeholder="Укажите дату..."
						dataOptions={getArrayDaysDuringWeek()}
					/>
					<SelectField
						classesGlobal="delivery__container"
						label="Время доставки"
						name="time"
						placeholder="Укажите время..."
						dataOptions={configAuxiliary.deliveryTime}
					/>
					<button className="delivery__btn universal-btn">
						Добавить информацию
					</button>
				</FormComponent>
				<h3 className="delivery__title delivery__title_fs">
					Доставка является бесплатной
				</h3>
			</div>
		)
	)
}

Delivery.propTypes = {
	onUpdate: PropTypes.func
}

export default Delivery
