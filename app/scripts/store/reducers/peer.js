import _ from 'lodash'

const DEFAULT_STATE = null

function peer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case 'PEER_SET':
      return action.peer
    case 'PEER_CLEAR':
      _.invoke(state, 'destroy')
      return DEFAULT_STATE
    default:
      return state
  }
}

export default peer
