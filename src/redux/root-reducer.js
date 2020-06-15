import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

//denotes what kind of storage is used for persistence, in this case local storage is used
//session storage can e accessed if it is imported
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

//whitelist property is an array containg any reducer name that  wants to be stored
//so i am going to persist cart
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
