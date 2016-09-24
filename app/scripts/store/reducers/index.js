import { combineReducers } from 'redux'

import peer from './peer'
import route from './route'

const reducers = combineReducers({
  peer,
  route,
})

export default reducers
