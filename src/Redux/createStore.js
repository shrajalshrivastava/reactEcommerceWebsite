import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddle from 'redux-saga'
import rootReducer from"./rootReducer"
import {persistStore} from "redux-persist"

import rootSaga from './rootSaga'


const sagaMiddlewre = createSagaMiddle();

export const middlewares =[thunk,logger,sagaMiddlewre];
export const store = createStore(rootReducer,applyMiddleware(...middlewares));
sagaMiddlewre.run(rootSaga); 
export const persistor = persistStore(store);
export default { store,
persistor };
