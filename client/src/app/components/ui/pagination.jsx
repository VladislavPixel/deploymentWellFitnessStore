import React, { useEffect } from "react"
import PropTypes from "prop-types"
import usePagination from "../../hooks/usePagination"

const Pagination = ({ maxGoods, length, current, onUpdatePagin, onArrow }) => {
	const scorePagins = Math.ceil(length / maxGoods)
	const { isPrev, isNext, stateArrayPagins } = usePagination(
		scorePagins,
		current
	)

	useEffect(() => {
		if (scorePagins < 2) {
			onUpdatePagin(1)
		}
		if (scorePagins < current) {
			onUpdatePagin(1)
		}
	})
	return (
		scorePagins > 1 && (
			<nav className="pagination-body">
				<img
					onClick={() => {
						onArrow("decrement")
					}}
					className={
						"pagination-body__arrow pagination-body__arrow_prev" +
						(isPrev ? " active" : "")
					}
					src="/img/icons/arrow-check.svg"
					alt="Стрелка влево"
				/>
				<ul className="pagination-body__list">
					{stateArrayPagins.map((item) => {
						return item._id !== "delimiter" ? (
							<li key={item._id}>
								<a
									onClick={(event) => {
										event.preventDefault()
										onUpdatePagin(item._id)
									}}
									href="/"
									className={
										"pagination-body__pagin" +
										(current === item._id ? " active" : "")
									}
								>
									{item.value}
								</a>
							</li>
						) : (
							<li key={item._id} className="pagination-body__delimiter">
								<span>{item.value}</span>
							</li>
						)
					})}
				</ul>
				<img
					onClick={() => {
						onArrow("increment")
					}}
					className={
						"pagination-body__arrow pagination-body__arrow_next" +
						(isNext ? " active" : "")
					}
					src="/img/icons/arrow-check.svg"
					alt="Стрелка вправо"
				/>
			</nav>
		)
	)
}

Pagination.propTypes = {
	maxGoods: PropTypes.number,
	length: PropTypes.number,
	current: PropTypes.number,
	onUpdatePagin: PropTypes.func,
	onArrow: PropTypes.func
}

export default Pagination
