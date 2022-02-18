import React, { useState, useRef, useEffect } from "react"
import withMessage from "../../HOC/withMessage"
import withLoading from "../../HOC/withLoading"
import AdminPanelCreateGood from "./adminPanelCreateGood"
import AdminPanelGoods from "./adminPanelGoods"
import AdminPanelLeftBlock from "./adminPanelLeftBlock"
import AdminPanelPurchaseList from "./adminPanelPurchaseList"
import AdminPanelSupportList from "./adminPanelSupportList"
import AdminPanelSubscripList from "./adminPanelSubscripList"
import { useSelector, useDispatch } from "react-redux"
import { getGoodsData, updateGood, createGood } from "../../store/goods"
import { getSubscriptionState } from "../../store/subscription"
import { getStateSupport } from "../../store/support"
import { getStatePurchaseBox } from "../../store/purchaseBox"
import { TextField } from "../common/form"

const AdminPanelContainer = () => {
	const [stateSearch, setStateSearch] = useState(null)
	const dispatch = useDispatch()
	const refLoadingId = useRef(null)
	const refMessage = useRef(null)
	const [isMessage, setMessage] = useState(false)
	const [stateSpinner, setSpinner] = useState(false)
	const goods = useSelector(getGoodsData())
	const filteredGoods =
		stateSearch === "" || stateSearch === null
			? goods
			: goods.filter((item) => item.name.toLowerCase().includes(stateSearch))
	const box = useSelector(getStatePurchaseBox())
	const support = useSelector(getStateSupport())
	const subscription = useSelector(getSubscriptionState())
	const [stateMode, setStateMode] = useState("create")
	const defaultStateGood = {
		category: "",
		description: "",
		imagesPath: "",
		name: "",
		price: "",
		totalInStock: ""
	}
	const [good, setGood] = useState(defaultStateGood)
	const handlerBtnMode = () => {
		setStateMode("create")
		setGood(defaultStateGood)
	}
	const handlerUpdateMode = (id) => {
		const targetGood = goods.find((el) => el._id === id)
		setGood(targetGood)
		setStateMode("update")
	}
	const handlerSubmit = async (data) => {
		if (stateMode === "create") {
			dispatch(createGood(data))
		}
		if (stateMode === "update") {
			dispatch(updateGood(data))
			setStateMode("create")
			setGood(defaultStateGood)
		}
		setSpinner(true)
		const idSpinner = setTimeout(() => {
			setMessage(true)
			setSpinner(false)
		}, 2000)
		const idMessage = setTimeout(() => {
			setMessage(false)
		}, 3000)
		refLoadingId.current = idSpinner
		refMessage.current = idMessage
	}
	useEffect(() => {
		return () => {
			clearTimeout(refLoadingId.current)
			clearTimeout(refMessage.current)
			setSpinner(false)
			setMessage(false)
		}
	}, [])
	const configMessageForCreateGood = {
		isWhite: true,
		title: "Успех операции",
		offer: "2 секунды, перенаправляю..."
	}
	const configMessageForGoods = {
		pathImage: "/img/message/space-user.svg",
		alt: "Космонавт",
		title: "В системе нет загруженных товаров",
		offer: "Нужно загрузить state данных",
		isWhite: true
	}
	const configMessageForPurchase = {
		isWhite: true,
		alt: "Песочные часы",
		pathImage: "/img/message/time.svg",
		offer: "Статус: в ожидании...",
		title: "На текущий момент заявок на приготовление заказов нет"
	}
	const configMessageForSupport = {
		pathImage: "/img/message/smile-message.svg",
		alt: "Смайлик внутри сообщения",
		offer: "Статус: в ожидании...",
		title: "На данный момент обращений нет",
		isWhite: true
	}
	const configMessageForSubscrip = {
		pathImage: "/img/message/angellist.svg",
		alt: "Иконка angellist",
		offer: "Статус: ожидание...",
		isWhite: true,
		title: "На данный момент на платформу никто не подписан"
	}
	const GoodsWithMessage = withMessage(
		AdminPanelGoods,
		configMessageForGoods,
		filteredGoods.length,
		null
	)
	const PurchaseListWithMessage = withMessage(
		AdminPanelPurchaseList,
		configMessageForPurchase,
		box.length,
		null
	)
	const SupportListWithMessage = withMessage(
		AdminPanelSupportList,
		configMessageForSupport,
		support.length,
		null
	)
	const SubscripListMessage = withMessage(
		AdminPanelSubscripList,
		configMessageForSubscrip,
		subscription.length,
		null
	)
	const CreateGoodWithLoading = withLoading(AdminPanelCreateGood, stateSpinner)
	const CreateGoodWithLoadingMessage = withMessage(
		CreateGoodWithLoading,
		configMessageForCreateGood,
		null,
		isMessage
	)
	const handlerChange = (event) => {
		setStateSearch(event.value)
	}
	const blockSearch = (
		<div className="admin-panel__search-block admin-search">
			<TextField
				classes="admin-search__field-block"
				id="admin-search"
				onChange={handlerChange}
				name="search"
				label="Поиск по наименованию товара:"
				placeholder="Начните вводить название товара..."
			/>
		</div>
	)
	return (
		<div className="admin-panel">
			<div className="admin-panel__column">
				<AdminPanelLeftBlock
					suffix="list"
					specialClass="admin-list"
					textTitle="Каталог всей продукции*"
					additional={blockSearch}
				>
					<GoodsWithMessage
						goods={filteredGoods}
						onUpdateMode={handlerUpdateMode}
					/>
				</AdminPanelLeftBlock>
				<AdminPanelLeftBlock
					suffix="purchase-box"
					specialClass="admin-purchase"
					textTitle="Товары к сборке*"
				>
					<PurchaseListWithMessage />
				</AdminPanelLeftBlock>
				<AdminPanelLeftBlock
					suffix="support-block"
					specialClass="block-support"
					textTitle="Все обращения в службу поддержки клиентов*"
				>
					<SupportListWithMessage />
				</AdminPanelLeftBlock>
				<AdminPanelLeftBlock
					suffix="subscription"
					specialClass="admin-subscription"
					textTitle="Клиенты, подписавшиеся на получение информации обо всех акциях*"
				>
					<SubscripListMessage />
				</AdminPanelLeftBlock>
			</div>
			<div className="admin-panel__column">
				<CreateGoodWithLoadingMessage
					onSubmit={handlerSubmit}
					good={good}
					stateMode={stateMode}
					onUpdateMode={handlerBtnMode}
				/>
			</div>
		</div>
	)
}

export default AdminPanelContainer
