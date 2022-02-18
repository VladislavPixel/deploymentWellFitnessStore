import React from "react"
import configAuxiliary from "../../configAuxiliary.json"

const AdminPanelHeadTable = () => {
	return (
		<div className="admin-list__row-head">
			{configAuxiliary.adminHeaderTable.map((el, index) => (
				<div key={index} className="admin-list__el-head">
					{el}
				</div>
			))}
		</div>
	)
}

export default AdminPanelHeadTable
