import React from "react"
import UniversalButton from "../common/universalButton"
import PropTypes from "prop-types"
import AdminPanelHeadTable from "./adminPanelHeadTable"
import { useDispatch } from "react-redux"
import { deleteGood } from "../../store/goods"

const AdminPanelGoods = ({ onUpdateMode, goods }) => {
	const dispatch = useDispatch()
	const handlerBtn = (data) => {
		if (data.status === "delete") {
			dispatch(deleteGood(data._id))
		}
		if (data.status === "update") {
			onUpdateMode(data._id)
		}
	}
	function getColor(key) {
		let color
		switch (key) {
		case "_id":
			color = "#900025"
			break
		case "name":
			color = "#4B7EE8"
			break
		case "price":
			color = "black"
			break
		case "description":
			color = "green"
			break
		case "category":
			color = "#6D38D2"
			break
		case "imagesPath":
			color = "#AF7C00"
			break
		case "totalInStock":
			color = "#00906D"
			break
		default:
			break
		}
		return color
	}
	return (
		<React.Fragment>
			<AdminPanelHeadTable />
			{goods.map((item, index) => {
				return (
					<div key={index} className="admin-list__line-good">
						<div className="admin-list__container-good">
							<div className="admin-list__el-good">
								<UniversalButton
									onMethod={handlerBtn}
									data={{ status: "update", _id: item._id }}
									isHandOver={true}
									text="Ред."
									specificalClass="universal-btn admin-list__update-btn"
								/>
								<UniversalButton
									onMethod={handlerBtn}
									data={{ status: "delete", _id: item._id }}
									isHandOver={true}
									text="Уд."
									specificalClass="universal-btn admin-list__delete-btn"
								/>
							</div>
						</div>
						{Object.keys(item).map((el, i) => {
							if (
								el === "createdAt" ||
								el === "updatedAt" ||
								el === "__v" ||
								el === "pathServerImage"
							) {
								return null
							}
							return (
								<div className="admin-list__container-good" key={i}>
									<div
										style={{ fontWeight: "bold", color: getColor(el) }}
										className="admin-list__el-good"
									>
										{item[el]}
									</div>
								</div>
							)
						})}
					</div>
				)
			})}
		</React.Fragment>
	)
}

AdminPanelGoods.propTypes = {
	onUpdateMode: PropTypes.func,
	goods: PropTypes.array
}

export default AdminPanelGoods
