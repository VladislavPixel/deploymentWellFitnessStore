import React, { useEffect } from "react"
import ContactHeadBlock from "./contactHeadBlock"
import initializationMap from "../../utils/contactsMap"
import ContactInfo from "./contactInfo"
import ContactsTile from "./contactsTile"
import configAuxiliary from "../../configAuxiliary.json"

const ContactsContainer = () => {
	useEffect(() => {
		initializationMap()
	}, [])
	const dataMagazine = configAuxiliary.contactsMagazine
	const dataStore = configAuxiliary.contactsStore
	return (
		<div className="contact _container">
			<h1 className="contact__global-title chief-title">Контакты</h1>
			<ContactHeadBlock />
			<h2 className="contact__title chief-sub-title">Офис</h2>
			<div className="contact__office">
				г. Москва, ул. Маршала Прошлякова, д. 30 офис 407, БЦ Зенит Плаза
			</div>
			<div className="contact__time">Режим работы 10:00 – 21:00</div>
			<div id="map"></div>
			<ContactInfo />
			<h2 className="contact__title chief-sub-title">Офис</h2>
			<ContactsTile data={dataStore} suffix="store" />
			<h2 className="contact__title chief-sub-title">Магазины партнеров</h2>
			<ContactsTile data={dataMagazine} suffix="magazine" />
			<h2 className="contact__title chief-sub-title">Интернет - магазины</h2>
			<div className="contact__internet-magazine internet-magazine">
				{configAuxiliary.contactsInternetMagazine.map((item, index) => {
					return (
						<div key={index} className="internet-magazine__column">
							<a href={item.link} className="internet-magazine__link">
								{item.title}
							</a>
						</div>
					)
				})}
			</div>
			<div className="contact__bad-companys companys-bad">
				<div className="companys-bad__head">
					WellFitness не сотрудничает с магазинами
				</div>
				<div className="companys-bad__row">
					{configAuxiliary.contactBadCompany.map((el, i) => {
						return (
							<div key={i} className="companys-bad__column">
								<div>{el}</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default ContactsContainer
