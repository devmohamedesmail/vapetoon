

import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'



import  cart_reducer from './reducers/cart_reducer'
import wishlist_reducer from './reducers/wishlist_reducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
 
 storage: AsyncStorage,
}

const rootReducer = combineReducers({
  cart: cart_reducer,
  wishlist: wishlist_reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})



let persistor = persistStore(store)
export { store, persistor };








// export const store = configureStore({
//   reducer: {
//     cart : cart_reducer,
//     wishlist: wishlist_reducer,
//   },
// })