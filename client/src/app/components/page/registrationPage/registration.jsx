import React, { useState } from "react"
import Header from "../../ui/header"
import AccesLayotsBox from "../../common/accesLayotBox"
import { TextField, RadioField, CheckField } from "../../common/form"
import { useDispatch, useSelector } from "react-redux"
import { userSignUp, getErrorUser } from "../../../store/user"
import configAuxiliary from "../../../configAuxiliary.json"

const RegistrationPage = () => {
	const dispatch = useDispatch()
	const errorMessage = useSelector(getErrorUser())
	const [dataDefault] = useState({
		name: "",
		surName: "",
		login: "",
		password: "",
		email: "",
		keyPhrase: "",
		phone: "",
		sex: "famele",
		privacyPolicy: false
	})
	const configSchema = {
		name: {
			isRequired: { message: `Поле "Имя" должно быть обязательно заполнено...` }
		},
		surName: {
			isRequired: {
				message: `Поле "Фамилия" должно быть обязательно заполнено...`
			}
		},
		login: {
			isRequired: {
				message: `Поле "Логин" должно быть обязательно заполнено...`
			}
		},
		password: {
			isRequired: { message: `Поле "Пароль" обязательно для заполнения...` },
			num: { message: `Пароль должен содержать хотя бы одну цифру` },
			upperEl: {
				message: `Пароль должен содержать хотя бы одну букву в верхнем регистре. Эта буква должна быть на латинице.`
			},
			specialCharacter: {
				message: `Пароль должен содержать хотя бы один специальный символ: !@#$%&^*?`
			},
			minElements: {
				message: `Пароль должен быть не меньше 8 символов`,
				value: 8
			}
		},
		email: {
			isRequired: { message: `Поле "Почта" обязательно для заполнения...` },
			isEmail: { message: `Поле "Почта" не удовлетворяет требованиям...` }
		},
		keyPhrase: {
			isRequired: {
				message: `Поле "Ключевая фраза" обязательно для заполнения...`
			}
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
		},
		privacyPolicy: {
			isRequired: {
				message: `Нам важно Ваше согласие с политикой обработки персональных данных`
			}
		}
	}
	const handlerSubmit = async (data) => {
		dispatch(userSignUp(data))
	}
	return (
		<React.Fragment>
			<Header noController={true} />
			<div style={configAuxiliary.configStylesError}>{errorMessage}</div>
			<AccesLayotsBox
				onSubmit={handlerSubmit}
				dataDefault={dataDefault}
				config={configSchema}
				{...configAuxiliary.configAccessLayotBoxRegistration}
			>
				<TextField name="name" label="Имя:" placeholder="name" />
				<TextField name="surName" label="Фамилия:" placeholder="surName" />
				<TextField name="login" label="Логин:" placeholder="login" />
				<TextField name="password" label="Пароль:" placeholder="password" />
				<TextField name="email" label="Почта:" placeholder="email" />
				<TextField
					name="keyPhrase"
					label="Ключевая фраза для восстановления пароля должна быть сверх уникальной"
					placeholder="keyPhrase"
				/>
				<TextField
					name="phone"
					label="Телефон:"
					placeholder="phone"
					message="Номер телефона нужно вводить через 8 без пробелов, пример: 89445320011"
				/>
				<RadioField
					name="sex"
					label="Пол:"
					options={[
						{ value: "famele", label: "Женский" },
						{ value: "male", label: "Мужской" },
						{ value: "other", label: "Другой" }
					]}
				/>
				<CheckField
					name="privacyPolicy"
					label="Соглашение с политикой конфиденциальности"
				/>
				<button className="login-layot-box__btn-sub">Регистрация</button>
			</AccesLayotsBox>
		</React.Fragment>
	)
}

export default RegistrationPage
