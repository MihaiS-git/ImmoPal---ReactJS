import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth-slice.js';
import agenciesReducer from './agencies-slice.js';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const rootReducer = combineReducers({
    auth: authReducer,
    agencies: agenciesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;