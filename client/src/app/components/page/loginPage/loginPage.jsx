import React, { useState } from "react"
import Header from "../../ui/header"
import AccesLayotsBox from "../../common/accesLayotBox"
import { TextField } from "../../common/form"
import { userSignIn, getErrorUser } from "../../../store/user"
import { useDispatch, useSelector } from "react-redux"
import configAuxiliary from "../../../configAuxiliary.json"

const LoginPage = () => {
	const dispatch = useDispatch()
	const errorMessage = useSelector(getErrorUser())
	const [dataDefault] = useState({
		login: "",
		email: "",
		password: ""
	})
	const configSchema = {
		login: {
			isRequired: { message: `Поле "Логин" обязательно для заполнения...` }
		},
		email: {
			isRequired: { message: `Поле "Почта" обязаельно для заполнения...` },
			isEmail: { message: `Поле "Почта" не удовлетворяет требованиям...` }
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
		}
	}
	const handlerSubmit = async ({ email, password }) => {
		dispatch(userSignIn({ email, password }))
	}
	return (
		<React.Fragment>
			<Header noController={true} />
			<div style={configAuxiliary.configStylesError}>{errorMessage}</div>
			<AccesLayotsBox
				onSubmit={handlerSubmit}
				dataDefault={dataDefault}
				config={configSchema}
				{...configAuxiliary.configAccessLayotBoxLogin}
			>
				<TextField name="login" label="Логин:" placeholder="login" />
				<TextField name="email" label="Почта:" placeholder="email" />
				<TextField
					name="password"
					label="Пароль:"
					placeholder="password"
					type="password"
					isPassword={true}
				/>
				<button className="login-layot-box__btn-sub">Войти</button>
			</AccesLayotsBox>
		</React.Fragment>
	)
}

export default LoginPage
