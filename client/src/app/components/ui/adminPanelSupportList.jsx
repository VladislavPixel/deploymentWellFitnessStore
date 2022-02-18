import React, { useState } from "react"
import UniversalButton from "../common/universalButton"
import { useSelector, useDispatch } from "react-redux"
import { getStateSupport, deleteSupportElement } from "../../store/support"

const AdminPanelSupportList = () => {
	const dispatch = useDispatch()
	const support = useSelector(getStateSupport())
	const [spoiler, setSpoiler] = useState(0)
	const handlerClick = (i) => setSpoiler(i)
	const handlerDeleteMessage = (id) => dispatch(deleteSupportElement(id))
	return (
		<div className="block-support__container">
			{support.map((item, index) => {
				return (
					<div className="block-support__el-container" key={index}>
						<div className="block-support__element">
							<span
								onClick={() => {
									handlerClick(index)
								}}
							>
								{item.name}
							</span>
							<a href={`mailto:${item.email}`}>{item.email}</a>
							<img
								onClick={() => {
									handlerClick(index)
								}}
								className={spoiler === index ? " active" : ""}
								src="/img/icons/spoiler-arrow.svg"
								alt="Стрелка"
							/>
						</div>
						<div
							className={
								"block-support__message" + (spoiler === index ? " active" : "")
							}
						>
							{item.message}
						</div>
						<UniversalButton
							onMethod={handlerDeleteMessage}
							data={item._id}
							isHandOver={true}
							text="Удалить обращение"
							specificalClass={
								"universal-btn block-support__delete-btn" +
								(spoiler === index ? " active" : "")
							}
						/>
					</div>
				)
			})}
		</div>
	)
}

export default AdminPanelSupportList
