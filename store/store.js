import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { logger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import newsReducer from './News';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  news: newsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
if (__DEV__) {
  middlewares.push(logger);
}

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

export { store, persistor };
