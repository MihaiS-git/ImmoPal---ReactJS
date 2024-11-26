import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth-slice.js';
import agenciesReducer from './agencies-slice.js';
import agentsReducer from './agents-slice.js';
import propertiesByAgencyReducer from './agency-properties-slice.js';
import propertiesReducer from './properties-slice.js';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'agencies', 'agents', 'propertiesByAgency', 'properties']
};

const rootReducer = combineReducers({
    auth: authReducer,
    agencies: agenciesReducer,
    agents: agentsReducer,
    propertiesByAgency: propertiesByAgencyReducer,
    properties: propertiesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;