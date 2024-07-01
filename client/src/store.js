import {configureStore} from '@reduxjs/toolkit'

import { combineReducers} from "redux"
import thunk from "redux-thunk"


import { registerReducer, loginReducer,
    getAllUsersReducer, } from "./reducers/userReducer"

import { getAllCatsReducer,getOneCategoryReducer, getOneSubCategoryReducer } from "./reducers/categoryReducer"
import { cartReducer } from './reducers/cartReducer'
import {getProductsByCategory, getProductById, getDealsProducts} from './reducers/productsReducer'
import { mailerReducer } from './reducers/mailReducer'
import { placeOrderReducer,myOrdersReducer,
    allUserOrdersReducer, } from "./reducers/orderReducer"


const combinedReducers = combineReducers({
    getAllCatsReducer:getAllCatsReducer,
    registerReducer:registerReducer,
    loginReducer:loginReducer,
    getAllUsersReducer: getAllUsersReducer,
    cartReducer:cartReducer,
    getOneCategoryReducer:getOneCategoryReducer,
    getOneSubCategoryReducer:getOneSubCategoryReducer,
    getProductsByCategory:getProductsByCategory,
    getProductById:getProductById,
    mailerReducer:mailerReducer,
    placeOrderReducer:placeOrderReducer,
    myOrdersReducer:myOrdersReducer,
    allUserOrdersReducer: allUserOrdersReducer,
    getDealsProducts:getDealsProducts
});

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

//if there is some data then convert it into JSON array else leave it as an emty array
//we need to convert because while storing in local storage we had converted it into JSON string for browser

const initialstate={

    cartReducer : {
        cartItems : cartItems
    },

    loginReducer :{
        currentUser : currentUser
    },

}


const middleware = [thunk];
const store = configureStore({
reducer:combinedReducers, preloadedState:initialstate, middleware:() =>middleware
})
export default store;