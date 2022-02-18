import React from "react"
import ContactsContainer from "../../ui/contactsContainer"
import withWrapPage from "../../../HOC/withWrapPage"
import configAuxiliary from "../../../configAuxiliary.json"

const ContactsPage = () => {
	const ContactsContainerWithWrapPage = withWrapPage(
		ContactsContainer,
		configAuxiliary.configHeaderControllerNo
	)
	return <ContactsContainerWithWrapPage />
}

export default ContactsPage
