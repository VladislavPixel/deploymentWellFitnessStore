import React from "react"
import PropTypes from "prop-types"

const ContactsTile = ({ data, suffix }) => {
	function getPhone(contact) {
		let currectTel = "+"
		if (contact[0] === "+") {
			for (let i = 0; i < contact.length; i++) {
				if (
					contact[i] !== " " &&
					typeof Number(contact[i]) === "number" &&
					!Number.isNaN(Number(contact[i]))
				) {
					currectTel += contact[i]
				}
			}
			return currectTel
		}
		return currectTel + contact.replaceAll("-", "").slice(1)
	}
	return (
		<div className="contact__tile tile-contact">
			{data.map((item, index) => {
				return (
					<div
						className={`tile-contact__column tile-contact__column_${suffix}`}
						key={index}
					>
						<div className="tile-contact__item">
							<div className="tile-contact__title">{item.head}</div>
							<div className="tile-contact__adress">{item.adress}</div>
							{(item.type === "email" && (
								<a
									href={`mailto:${item.contact}`}
									className="tile-contact__link"
								>
									{item.contact}
								</a>
							)) ||
								(item.type === "phone" && (
									<a
										href={`tel:${getPhone(item.contact)}}`}
										className="tile-contact__link"
									>{`${item.contact} доб. ${index + 1}`}</a>
								))}
							{item.time && (
								<div className="tile-contact__time">{item.time}</div>
							)}
						</div>
					</div>
				)
			})}
		</div>
	)
}

ContactsTile.propTypes = {
	data: PropTypes.array,
	suffix: PropTypes.string
}

export default ContactsTile
