import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import "./app/scss/style.scss"
import App from "./app/App.js"
import reportWebVitals from "./reportWebVitals"
import createStore from "./app/store/createStore"
import { Provider } from "react-redux"
import history from "./app/utils/history"

const store = createStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
)

reportWebVitals()
