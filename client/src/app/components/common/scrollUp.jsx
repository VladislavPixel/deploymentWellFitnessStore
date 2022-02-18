import React, { useState, useEffect } from "react"

const ScrollUp = () => {
	const [scroll, setScroll] = useState(0)
	const goUp = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		})
	}
	useEffect(() => {
		function showScroll(e) {
			setScroll(window.scrollY)
		}
		window.addEventListener("scroll", showScroll)
		return function cleanup() {
			window.removeEventListener("scroll", showScroll)
			setScroll(0)
		}
	}, [])
	return (
		scroll > 0 && (
			<div className="scroll-up">
				<div onClick={goUp} className="scroll-up__container">
					<img
						src="/img/icons/arrow-up.svg"
						alt="Иконка прокрутки вверх, стрелка UP"
					/>
				</div>
			</div>
		)
	)
}

export default ScrollUp
