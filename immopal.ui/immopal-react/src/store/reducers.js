import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth-slice.js';
import agenciesReducer from './agencies-slice.js';
import agentsReducer from './agents-slice.js';
import propertiesByAgencyReducer from './agency-properties-slice.js';
import propertiesReducer from './properties-slice.js';
import personReducer from './person-slice.js';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'agencies', 'agents', 'propertiesByAgency', 'properties', 'person']
};

const combinedReducer = combineReducers({
    auth: authReducer,
    agencies: agenciesReducer,
    agents: agentsReducer,
    propertiesByAgency: propertiesByAgencyReducer,
    properties: propertiesReducer,
    person: personReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') {
        state = undefined;
    }
    return combinedReducer(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
