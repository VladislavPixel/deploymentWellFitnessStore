import React from "react"
import ImageCard from "../common/imageCard"
import UniversalButton from "../common/universalButton"
import { useSelector, useDispatch } from "react-redux"
import {
	getSubscriptionState,
	deleteSubscription
} from "../../store/subscription"

const AdminPanelSubscripList = () => {
	const dispatch = useDispatch()
	const subscription = useSelector(getSubscriptionState())
	const handlerDeleteSub = (id) => dispatch(deleteSubscription(id))
	return (
		<div className="admin-subscription__container">
			<div className="admin-subscription__row">
				{subscription.map((element, index) => {
					return (
						<div key={index} className="admin-subscription__column">
							<div className="admin-subscription__block">
								<div className="admin-subscription__head">
									<ImageCard
										imagesPath={`https://avatars.dicebear.com/api/micah/${element.images}.svg`}
										name="Иконка пользователя"
									/>
									<div className="admin-subscription__name">{element.name}</div>
								</div>
								<div className="admin-subscription__footer">
									<a
										href={`tel:+7${element.phone.slice(1)}`}
										className="admin-subscription__phone"
									>
										{element.phone}
									</a>
									<a
										href={`mailto:${element.email}`}
										className="admin-subscription__email"
									>
										{element.email}
									</a>
									<UniversalButton
										onMethod={handlerDeleteSub}
										text="Удалить из подписок"
										isHandOver={true}
										data={element._id}
										specificalClass="universal-btn admin-subscription__delete-btn"
									/>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default AdminPanelSubscripList
