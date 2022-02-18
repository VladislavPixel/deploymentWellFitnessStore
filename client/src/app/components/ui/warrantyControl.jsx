import React from "react"
import PropTypes from "prop-types"
import UniversalButton from "../common/universalButton"
import QuantityController from "../common/quantityСontroller"
import getCorrectYear from "../../utils/getCorrectYear"

const WarrantyControl = ({
	year,
	price,
	name,
	text,
	stateControl,
	onUpdate,
	onAdded
}) => {
	const handlerIncrement = () => {
		onUpdate({
			years: stateControl.years + year,
			warrantyPrice: stateControl.warrantyPrice + price
		})
	}
	const handlerDecrement = () => {
		onUpdate({
			years: stateControl.years - year,
			warrantyPrice: stateControl.warrantyPrice - price
		})
	}
	return (
		<div className="block-offer-warranty__column">
			<div className="block-offer-warranty__card card-warranty">
				<div className="card-warranty__name">{name}</div>
				<div className="card-warranty__conditions">{`${price} ₽ / ${year} ${text}`}</div>
				<QuantityController
					isContent={true}
					delimiter={getCorrectYear(stateControl.years)}
					classes="card-warranty-el"
					onDecrement={handlerDecrement}
					onIncrement={handlerIncrement}
				/>
				<UniversalButton
					onMethod={onAdded}
					specificalClass="card-warranty__btn"
					text="Добавить"
				/>
			</div>
		</div>
	)
}

WarrantyControl.propTypes = {
	year: PropTypes.number,
	price: PropTypes.number,
	name: PropTypes.string,
	text: PropTypes.string,
	stateControl: PropTypes.object,
	onUpdate: PropTypes.func,
	onAdded: PropTypes.func
}

export default WarrantyControl
