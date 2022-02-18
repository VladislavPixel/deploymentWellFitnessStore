import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "swiper/swiper-bundle.min.css"
import "swiper/swiper.min.css"
import Start from "./layots/start"
import Home from "./layots/home"
import AboutUs from "./layots/aboutUs"
import Brands from "./layots/brands"
import Contacts from "./layots/contacts"
import Login from "./layots/login"
import Registration from "./layots/registration"
import Car from "./layots/car"
import NotFound from "./layots/notFound"
import Welcome from "./layots/welcome"
import AdminPanel from "./layots/adminPanel"
import ScrollUp from "./components/common/scrollUp"
import ProtectedRoute from "./components/common/protectedRoute"
import GoodsLoaderGlobal from "./HOC/goodsLoaderGlodal"
import GlobalLoaderAuth from "./HOC/globalLoaderAuth"
import RecoveryPassword from "./layots/recoveryPassword"

function App() {
	return (
		<React.Fragment>
			<GoodsLoaderGlobal>
				<GlobalLoaderAuth>
					<>
						<Switch>
							<Route path="/about-us" component={AboutUs} />
							<Route path="/brands/:brandID?" component={Brands} />
							<Route path="/contacts" component={Contacts} />
							<Route path="/login" component={Login} />
							<Route path="/registration" component={Registration} />
							<Route path="/recovery-password" component={RecoveryPassword} />
							<ProtectedRoute path="/car" component={Car} />
							<Route path="/not-faund" component={NotFound} />
							<Route path="/init" component={Start} />
							<Route path="/home/:goodID?" component={Home} />
							<ProtectedRoute path="/admin-panel" component={AdminPanel} />
							<Route path="/" component={Welcome} exact />
							<Redirect from="/main" to="/" />
							<Redirect to="/not-faund" />
						</Switch>
						<ScrollUp />
					</>
					<ToastContainer />
				</GlobalLoaderAuth>
			</GoodsLoaderGlobal>
		</React.Fragment>
	)
}

export default App
