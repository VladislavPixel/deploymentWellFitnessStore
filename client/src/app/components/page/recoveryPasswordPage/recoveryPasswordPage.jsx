import React, { useState } from "react"
import Header from "../../ui/header"
import AccesLayotsBox from "../../common/accesLayotBox"
import { TextField } from "../../common/form"
import configAuxiliary from "../../../configAuxiliary.json"
import { useDispatch, useSelector } from "react-redux"
import { userRecoveryPassword, getErrorUser } from "../../../store/user"

const RecoveryPasswordPage = () => {
	const errorMessage = useSelector(getErrorUser())
	const dispatch = useDispatch()
	const [dataDefault] = useState({
		login: "",
		email: "",
		keyPhrase: "",
		surName: "",
		password: ""
	})
	const configSchema = {
		login: {
			isRequired: {
				message: `Чтобы восстановление прошло гладко, нам понадобится "Логин"`
			}
		},
		email: {
			isRequired: { message: `Поле "Почта" обязательно для заполнения...` },
			isEmail: { message: `Поле "Почта" не удовлетворяет требованиям...` }
		},
		keyPhrase: {
			isRequired: {
				message: `"Ключевая фраза" обязательно должна быть заполнена, именно по ней происходит восстановление...`
			}
		},
		surName: {
			isRequired: {
				message: `Поле "Фамилия" должно быть обязательно заполнено...`
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
		}
	}
	const handlerSubmit = async (data) => {
		dispatch(userRecoveryPassword(data))
	}
	return (
		<React.Fragment>
			<Header noController={true} />
			<div style={configAuxiliary.configStylesError}>{errorMessage}</div>
			<AccesLayotsBox
				onSubmit={handlerSubmit}
				dataDefault={dataDefault}
				config={configSchema}
				{...configAuxiliary.configAccessLayotBoxRecovery}
			>
				<TextField
					name="login"
					label="Логин:"
					placeholder="Логин как при регистрации"
				/>
				<TextField
					name="email"
					label="Почта:"
					placeholder="email как при регистрации"
				/>
				<TextField
					name="keyPhrase"
					label="Уникальная фраза*"
					placeholder="Введите свою уникальную ключевую фразу как при регистрации"
				/>
				<TextField name="surName" label="Фамилия:" placeholder="surName" />
				<TextField
					name="password"
					label="Придумайте новый пароль:"
					placeholder="password"
					type="password"
					isPassword={true}
				/>
				<button className="login-layot-box__btn-sub">
					Начать процесс recovery
				</button>
			</AccesLayotsBox>
		</React.Fragment>
	)
}

export default RecoveryPasswordPage
