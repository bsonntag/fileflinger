import _ from 'lodash'

const DEFAULT_STATE = {
  current: 'main',
  previous: null,
}

function route(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case 'ROUTE_CHANGE':
      return changeRoute(state, action.route)
    case 'ROUTE_GO_BACK':
      return goBack(state)
    default:
      return state
  }
}

function changeRoute(state, newRoute) {
  let newState = {
    current: newRoute,
    previous: state.current,
  }
  return _.extend({}, state, newState)
}

function goBack(state) {
  if(!state.previous)
    return state

  let newState = {
    current: state.previous,
    previous: null,
  }
  return _.extend({}, state, newState)
}

export default route
