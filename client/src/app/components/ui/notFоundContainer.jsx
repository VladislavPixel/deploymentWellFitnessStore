import React from "react"
import { useHistory } from "react-router-dom"
import UniversalButton from "../common/universalButton"

const NotFoundContainer = () => {
	const history = useHistory()
	const handlerBack = () => history.replace("/")
	return (
		<div className="not-found__body">
			<img
				className="not-found__images"
				src="/img/not-found/not-found.png"
				alt="Рука с часами. Error 404"
			/>
			<div className="not-found__content">
				<h2 className="not-found__title">
					Извините, но мы не нашли эту страницу
				</h2>
				<UniversalButton
					onMethod={handlerBack}
					specificalClass="universal-btn not-found__back"
					text="Вернуться на страницу приветствия"
				/>
			</div>
		</div>
	)
}

export default NotFoundContainer
