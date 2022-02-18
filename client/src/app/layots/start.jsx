import React from "react"
import useMockData from "../hooks/useMockData"

const Start = () => {
	const { initialization, error, status, process } = useMockData()
	const handlerClick = () => {
		initialization()
	}
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				padding: "90px 10px 90px 10px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center"
			}}
		>
			<h1
				style={{ fontSize: "50px", fontWeight: "bold", marginBottom: "30px" }}
			>
				Стартовая страница
			</h1>
			<h3 style={{ fontSize: "30px", fontWeight: "500", marginBottom: "20px" }}>
				Инициализация проекта
			</h3>
			<ul style={{ marginBottom: "10px" }}>
				<li
					style={{ marginBottom: "10px", fontSize: "18px" }}
				>{`Status: ${status}`}</li>
				<li
					style={{ fontSize: "18px", fontWeight: "500" }}
				>{`Percent downloads: ${process}%`}</li>
				{error && <li>{`ERROR: ${error}`}</li>}
			</ul>
			<button
				onClick={handlerClick}
				style={{ background: "blue", color: "white", padding: "15px" }}
			>
				Инициализировать
			</button>
		</div>
	)
}

export default Start
