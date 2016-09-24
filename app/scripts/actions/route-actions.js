export function changeRoute(route) {
  return {
    type: 'ROUTE_CHANGE',
    route,
  }
}

export function goBack() {
  console.log('goBack')
  return {
    type: 'ROUTE_GO_BACK',
  }
}
