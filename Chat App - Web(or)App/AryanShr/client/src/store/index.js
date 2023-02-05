import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit'
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key:"root",
    version:1,
    storage
}
const loginSlice = createSlice({
    name: "login",
    initialState: { isLoggedIn: false, user: null, token: null },
    reducers: {
        login: (state, action) => {
            localStorage.clear();
            state.isLoggedIn = true;
            state.user = action.payload.others;
            state.token = action.payload.token;
        },
        logout: (state) => {
            localStorage.clear()
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
        }
    }
});

const reducers = combineReducers({
    login: loginSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig,reducers);

export const loginAction = loginSlice.actions


export const store = configureStore({
    reducer: persistedReducer,
    // reducer:loginSlice.reducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store);