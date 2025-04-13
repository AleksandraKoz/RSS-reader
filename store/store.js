import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { logger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import newsReducer from './News';

const persistConfig = {
  key: 'news',
  storage: AsyncStorage,
  whitelist: ['newsFeeds', 'favouriteNews'],
  serialize: true,
};

const rootReducer = combineReducers({
  news: persistReducer(persistConfig, newsReducer),
});

const middlewares = [thunk];
if (__DEV__) {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

export { store, persistor };
