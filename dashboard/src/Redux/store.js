import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {
  RequestDeleteReducer,
  requestCreateReducer,
  requestDeliveredReducer,
  requestDetailsReducer,
  requestListReducer,
  requestRefusedReducer,
} from "./Reducers/RequestReducres";
import { forgotPasswordReducer, userLoginReducer } from "./Reducers/userReducers";
import { USERCreateReducer, UserDeleteReducer, userListReducer, userUpdateReducer } from "./Reducers/AdminReducers";


const reducer = combineReducers({
  userLogin: userLoginReducer,
  forgotPassword: forgotPasswordReducer,
  userList: userListReducer,
  userDelete:UserDeleteReducer,
  userUpdate:userUpdateReducer,
  requestList: requestListReducer,
  requestDetails: requestDetailsReducer,
  requestDeliver: requestDeliveredReducer,
  requestRefused: requestRefusedReducer,
  requestCreate: requestCreateReducer,
  requestDelete:RequestDeleteReducer,
  userCreate: USERCreateReducer,


});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
