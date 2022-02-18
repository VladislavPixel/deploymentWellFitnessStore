import React from "react"
import configAuxiliary from "../../configAuxiliary.json"

const ContactInfo = () => {
	return (
		<div className="contact__info info-contact">
			{configAuxiliary.contactsDepartments.map((item, index) => {
				let correctPhone = ""
				for (let i = 0; i < item.phone.length; i++) {
					if (
						item.phone[i] !== " " &&
						typeof Number(item.phone[i]) === "number" &&
						!Number.isNaN(item.phone[i])
					) {
						correctPhone += item.phone[i]
					}
				}
				return (
					<div key={index} className="info-contact__container">
						<div className="info-contact__column">{item.title}</div>
						<div className="info-contact__column">
							<a
								href={`tel:+${correctPhone}`}
								className="info-contact__phone"
							>{`${item.phone} доб. ${index + 1}`}</a>
						</div>
						<div className="info-contact__column">
							{item.mail.map((element, index) => {
								return (
									<div key={index} className="info-contact__line">
										<a
											href={`mailto:${element.adress}`}
											className="info-contact__adress"
										>
											{element.adress}
										</a>
										{element.sub && (
											<div className="info-contact__sub">{element.sub}</div>
										)}
									</div>
								)
							})}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default ContactInfo
