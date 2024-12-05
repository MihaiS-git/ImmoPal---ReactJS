import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./reducers";
import { persistStore } from 'redux-persist';
import auctionMiddleware from '../util/auction-middleware.js';

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/REGISTER'
                ]
            }
        })
    .concat(auctionMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };