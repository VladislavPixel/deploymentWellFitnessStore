import { configureStore, combineReducers } from "@reduxjs/toolkit"
import categoryReducer from "./category"
import goodsReducer from "./goods"
import brandCategoryReducer from "./brandCategory"
import brandCategorySubjectReducer from "./brandCategorySubject"
import brandReducer from "./brand"
import carReducer from "./car"
import userReducer from "./user"
import subscriptionReducer from "./subscription"
import supportReducer from "./support"
import purchaseBoxReducer from "./purchaseBox"

const rootReducer = combineReducers({
	category: categoryReducer,
	goods: goodsReducer,
	brandCategory: brandCategoryReducer,
	brandCategorySubject: brandCategorySubjectReducer,
	brand: brandReducer,
	car: carReducer,
	user: userReducer,
	subscription: subscriptionReducer,
	support: supportReducer,
	purchaseBox: purchaseBoxReducer
})

export default function createStore() {
	return configureStore({
		reducer: rootReducer
	})
}
