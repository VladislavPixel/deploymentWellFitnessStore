import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import UniversalButton from "../common/universalButton"
import MenuNav from "../common/menuNav"
import ImageLink from "../common/imageLink"
import PropTypes from "prop-types"
import { TextField } from "../common/form"
import config from "../../configAuxiliary.json"
import {
	userLogOut,
	getCurrentUserState,
	getStatusAuthUser
} from "../../store/user"
import { useSelector, useDispatch } from "react-redux"
import { getLengthCar, getStatusLoaderCar } from "../../store/car"

const Header = ({ onUpdateCatalog, onChange, noController }) => {
	const dispatch = useDispatch()
	const currentUser = useSelector(getCurrentUserState())
	const statusAuth = useSelector(getStatusAuthUser())
	const widthWindow = window.screen.width
	const statusLoaderCar = useSelector(getStatusLoaderCar())
	const lengthCarState = useSelector(getLengthCar())
	const [flagAdmin, setFlagAdmin] = useState(false)
	function getPfrase() {
		if (currentUser) {
			if (currentUser.isAdmin) {
				return `Админу все двери открыты < ${currentUser.name} >`
			}
			return `Приветствуем тебя ${currentUser.name}!`
		}
		return "Приветствуем тебя дорогой покупатель!"
	}
	const handlerBtnLogOut = () => dispatch(userLogOut())
	useEffect(() => {
		if (currentUser && currentUser.isAdmin) {
			setFlagAdmin(true)
		} else {
			setFlagAdmin(false)
		}
	}, [currentUser])
	return (
		<header className="header">
			<div className="header__container _container header__container_first">
				<ImageLink to="/home" />
				<MenuNav config={config.menuHead} />
				<div className="header__buttons">
					{(!currentUser && (
						<React.Fragment>
							<Link to="/login" className="header__btn">
								Вход
							</Link>
							<Link to="/registration" className="header__btn">
								Регистрация
							</Link>
						</React.Fragment>
					)) || (
						<div onClick={handlerBtnLogOut} className="header__btn">
							Выход
						</div>
					)}
				</div>
			</div>
			<div className="header__container _container header__container_second">
				<div className="header__user-elements">
					{!noController && (
						<React.Fragment>
							{widthWindow > 470 && (
								<UniversalButton
									isHandOver={false}
									onMethod={onUpdateCatalog}
									specificalClass="header__catalog-btn"
									text="Каталог"
								/>
							)}
							<TextField
								widthWindow={widthWindow}
								name="search"
								label={<img src="/img/header/search.png" alt="Иконка поиска" />}
								placeholder="search"
								onChange={onChange}
								classesSearch="search-text-field"
							/>
						</React.Fragment>
					)}
				</div>
				{widthWindow >= 940 && (
					<div className="header__greetings">{getPfrase()}</div>
				)}
				<div className="header__car-block car-header">
					{widthWindow <= 470 && !noController && (
						<UniversalButton
							isHandOver={false}
							onMethod={onUpdateCatalog}
							specificalClass="header__catalog-btn"
							text="Каталог"
						/>
					)}
					{currentUser && !currentUser.isAdmin && (
						<Link to="/car" className="header__car car-header">
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fad"
								data-icon="cart-arrow-down"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
								className="svg-inline--fa fa-cart-arrow-down fa-w-18 fa-2x"
							>
								<g className="fa-group">
									<path
										fill="currentColor"
										d="M552 64H159.21l52.36 256h293.15a24 24 0 0 0 23.4-18.68l47.27-208a24 24 0 0 0-18.08-28.72A23.69 23.69 0 0 0 552 64zM444.42 196.48l-67.83 72a12.27 12.27 0 0 1-17.18 0l-67.83-72c-7.65-7.55-2.23-20.48 8.59-20.48h43.54v-52a12.07 12.07 0 0 1 12.14-12h24.29a12.07 12.07 0 0 1 12.15 12v52h43.54c10.82 0 16.24 12.93 8.59 20.48z"
										className="fa-secondary"
									></path>
									<path
										fill="currentColor"
										d="M504.42 405.6l5.52-24.28a24 24 0 0 0-23.4-29.32H218.12L150 19.19A24 24 0 0 0 126.53 0H24A24 24 0 0 0 0 24v16a24 24 0 0 0 24 24h69.88l70.25 343.43a56 56 0 1 0 67.05 8.57h209.64a56 56 0 1 0 63.6-10.4zm-145-137.12a12.27 12.27 0 0 0 17.18 0l67.83-72c7.65-7.55 2.23-20.48-8.59-20.48h-43.55v-52a12.07 12.07 0 0 0-12.15-12h-24.29a12.07 12.07 0 0 0-12.14 12v52h-43.54c-10.82 0-16.24 12.93-8.59 20.48z"
										className="fa-primary"
									></path>
								</g>
							</svg>
							{statusLoaderCar ? (
								<span>{statusLoaderCar}</span>
							) : (
								<span>{lengthCarState}</span>
							)}
						</Link>
					)}
				</div>
			</div>
			{statusAuth && (
				<div className="header__admin-container">
					{(flagAdmin && (
						<Link to="/admin-panel" className="header__admin-link">
							Админ-панель
						</Link>
					)) || (
						<div className="header__user-rating">
							Количество совершенных покупок:{" "}
							<span>
								{currentUser.numberOfPurchases
									? currentUser.numberOfPurchases
									: 0}
							</span>
						</div>
					)}
				</div>
			)}
		</header>
	)
}

Header.propTypes = {
	onChange: PropTypes.func,
	onUpdateCatalog: PropTypes.func,
	noController: PropTypes.bool
}

export default Header
