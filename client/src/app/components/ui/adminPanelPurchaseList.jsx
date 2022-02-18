import React from "react"
import getCorrectYear from "../../utils/getCorrectYear"
import UniversalButton from "../common/universalButton"
import {
	getStatePurchaseBox,
	deletePurchaseBoxElement
} from "../../store/purchaseBox"
import { useSelector, useDispatch } from "react-redux"

const AdminPanelPurchaseList = () => {
	const dispatch = useDispatch()
	const box = useSelector(getStatePurchaseBox())
	const handlerDeletePurchase = (id) => dispatch(deletePurchaseBoxElement(id))
	return (
		<div className="admin-purchase__list">
			{box.map((purchase, index) => {
				const deliveryObject = purchase.stateDelivery
				return (
					<div key={index} className="admin-purchase__box-pur">
						<div className="admin-purchase__row-pur">
							{purchase.carState.map((el, i) => {
								return (
									<div key={i} className="admin-purchase__column-box">
										<div className="admin-purchase__block-box">
											<div className="admin-purchase__head-box">{`Заказ №${
												i + 1
											}`}</div>
											<div className="admin-purchase__line-box">{`_id: ${el._id}`}</div>
											<div className="admin-purchase__line-box">{`Наименование: ${el.name}`}</div>
											<div className="admin-purchase__line-box">{`Количество: ${el.count}`}</div>
											<div className="admin-purchase__line-box">{`Общая цена: ${
												el.count * el.price
											}р`}</div>
										</div>
									</div>
								)
							})}
						</div>
						{purchase.guarantee?.length > 0 && (
							<div className="admin-purchase__guarantee">
								{purchase.guarantee.map((item, ind) => (
									<div key={ind} className="admin-purchase__line-guarantee">{`${
										ind + 1
									}) Гарантия на ${item.name}, срок - ${getCorrectYear(
										item.years
									)}, цена гарантии: ${item.warrantyPrice}р.`}</div>
								))}
							</div>
						)}
						<div className="admin-purchase__delivery">{`Адрес доставки заказа: г. ${deliveryObject.city}, ул. ${deliveryObject.road}, д. ${deliveryObject.home}, корп. ${deliveryObject.housing}, кв. ${deliveryObject.room}`}</div>
						<div className="admin-purchase__dop-delivery">{`Дополнительная информация по доставке - назначенная дата (${deliveryObject.date}); телефон клиента (${deliveryObject.phone}); временные рамки (${deliveryObject.time})`}</div>
						<UniversalButton
							onMethod={handlerDeletePurchase}
							text="Очистить"
							isHandOver={true}
							data={purchase._id}
							specificalClass="universal-btn admin-purchase__delete-btn"
						/>
					</div>
				)
			})}
		</div>
	)
}

export default AdminPanelPurchaseList
