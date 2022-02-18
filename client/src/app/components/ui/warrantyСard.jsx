import React, { useState } from "react"
import PropTypes from "prop-types"
import WarrantyControl from "./warrantyControl"
import configAuxiliary from "../../configAuxiliary.json"

const WarrantyCard = ({ name, onUpdateGuarantee }) => {
	const [stateControl, setStateControl] = useState({
		years: 0,
		warrantyPrice: 0
	})
	const arrayControl = configAuxiliary.warrantyControl
	const handlerUpdateState = (data) => {
		if (data.years >= 0 && data.years < 8) {
			setStateControl(data)
		}
	}
	const handlerAdded = () => onUpdateGuarantee({ ...stateControl, name })
	return (
		<div className="warranty-card">
			<h4 className="warranty-card__title">
				Собери дополнительную гарантию до 7 лет
			</h4>
			<div className="warranty-card__sub-title">
				Хотите быть полностью уверены в новом товаре? Оформите Дополнительную
				гарантию на срок до 7 лет. Она начнет действовать сразу после истечения
				основного срока гарантии.
			</div>
			<div className="warranty-card__message">
				Если в вашей корзине &#34;дорогостоящих товаров&#34; одного вида больше 1,
				отмеченный вид гарантии распространяется на каждый из товаров одного
				вида.
			</div>
			<div className="warranty-card__offer-block block-offer-warranty">
				{arrayControl.map((item, index) => (
					<WarrantyControl
						key={index}
						{...item}
						name={name}
						stateControl={stateControl}
						onUpdate={handlerUpdateState}
						onAdded={handlerAdded}
					/>
				))}
			</div>
		</div>
	)
}

WarrantyCard.propTypes = {
	name: PropTypes.string,
	onUpdateGuarantee: PropTypes.func
}

export default WarrantyCard
