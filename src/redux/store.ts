import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './userSlice';
import { chatsSlice } from './chatsSlice';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  chats: chatsSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chats","user" ], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
