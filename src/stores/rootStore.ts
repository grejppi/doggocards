import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

const rootStore = createStore(rootReducer, applyMiddleware(thunk))

export default rootStore
