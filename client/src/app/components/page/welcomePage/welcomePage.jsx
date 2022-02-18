import React, { useEffect } from "react"
import initializationSLider from "../../../utils/welcomeSlider"
import configAuxiliary from "../../../configAuxiliary.json"
import UniversalButton from "../../common/universalButton"
import { useHistory } from "react-router-dom"

const WelcomePage = () => {
	const history = useHistory()
	const arraySlidesImage = configAuxiliary.colorArrayWelcomeSlider.rightBlock
	const arrayColor = configAuxiliary.colorArrayWelcomeSlider.leftBlock
	const handlerToTheMain = () => {
		history.push("/home")
	}
	useEffect(() => {
		initializationSLider()
	}, [])
	return (
		<div className="welcome">
			<div className="welcome__column welcome__column_left">
				{arrayColor.map((element, index) => {
					return (
						<div key={index} className="welcome__color-container">
							<div
								style={{ background: element.backColor }}
								className="welcome__color"
							></div>
							<div className="welcome__content">
								<div className="welcome__prev-title">{element.prevTitle}</div>
								<h2 className="welcome__title">{element.title}</h2>
								<UniversalButton
									onMethod={handlerToTheMain}
									specificalClass="welcome__button"
									text="Перейти к каталогу"
								/>
							</div>
						</div>
					)
				})}
			</div>
			<div className="welcome__column welcome__column_right">
				{arraySlidesImage.map((image, index) => {
					return (
						<div key={index} className="welcome__image-container">
							<img
								className="welcome__img"
								src={`/img/welcomeSlider/${image}`}
								alt="Спортивные картинки слайдов"
							/>
						</div>
					)
				})}
			</div>
			<div className="welcome__control">
				<div className="welcome__up welcome__btn">
					<img src="/img/icons/arrow-red.svg" alt="Стрелка" />
				</div>
				<div className="welcome__down welcome__btn">
					<img src="/img/icons/arrow-red.svg" alt="Стрелка" />
				</div>
			</div>
		</div>
	)
}

export default WelcomePage
